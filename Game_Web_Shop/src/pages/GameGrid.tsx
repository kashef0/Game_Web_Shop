import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "../components/partials/GameCard";
import GameCardSkeleton from "../components/partials/GameCardSkeleton";

import { BackendGameData, FullGame, Games, Genre } from "../types/Game";
import { resetFilters } from "@/store/Slices/genreSlice";
import { RootState } from "@/store/store";
import { gamesError, gamesReceived } from "@/store/Slices/gamesSlice";
import useGet from "@/hooks/useGet";
import Pagination from "@/components/Pagination";

// skeletons för laddning
const Skeletons = [1, 2, 3, 4, 5, 6];

const GameGrid = () => {
  const dispatch = useDispatch();

  // Hämtar relevanta delar av Redux-statet

  const { status, games, error, onSearchText } = useSelector(
    (state: RootState) => state.games
  );
  const selectedGenreId = useSelector(
    (state: RootState) => state.genre.selectedGenreId
  );
  const selectedRelevance = useSelector(
    (state: RootState) => state.genre.selectedRelevance
  );
  const selectedPlatformId = useSelector(
    (state: RootState) => state.genre.selectedPlatformId
  );

  const GAMES_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const DATABASE_URL = import.meta.env.VITE_DATABASE_API_URL;

  // Hämtar spel från Databasen
  const {
    data: backendGames,
    error: backendError,
    loading: backendLoading,
  } = useGet<BackendGameData[]>(`${DATABASE_URL}/api/games`, false);

  const [rawgData, setRawgData] = useState<FullGame[]>([]);
  const [rawgLoading, setRawgLoading] = useState(false);
  const [rawgError, setRawgError] = useState<string | null>(null);

  // Nollställ filter när komponenten mountas
  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  // Hämtar data från RAWG för varje spel från backend
  useEffect(() => {
    const fetchRawgGames = async () => {
      if (!backendGames) return;

      setRawgLoading(true);
      setRawgError(null);

      try {
        // Hämta RAWG data för varje backend spel
        const rawgResponses = await Promise.all(
          backendGames.map((game) =>
            fetch(`${API_URL}/games/${game.rawgId}?key=${API_KEY}`).then(
              (res) => res.json()
            )
          )
        );

        // Kombinera backend peldata med RAWG speldata
        const combined: FullGame[] = backendGames.map((b, i) => ({
          ...b, // Backend data
          ...rawgResponses[i], // RAWG data
          id: b._id, // Lägg till id från backendGames för att säkerställa konsekvens
        }));

        // Uppdatera status med den kombinerade speldatan
        setRawgData(combined);
      } catch (err) {
        console.error("RAWG fetch error:", err);
        setRawgError("Could not fetch RAWG games");
      } finally {
        setRawgLoading(false);
      }
    };

    fetchRawgGames();
  }, [backendGames]);

  useEffect(() => {
    if (rawgData.length) {
      let filtered = [...rawgData];
      if (selectedGenreId) {
        filtered = filtered.filter((game) =>
          game.genres?.some(
            (g: Genre) => g.id.toString() === selectedGenreId.toString()
          )
        );
      }

      // Filtrera på plattform
      if (selectedPlatformId) {
        filtered = filtered.filter((game) =>
          game.parent_platforms?.some(
            (p) => p.platform?.id === selectedPlatformId
          )
        );
      }

      // Sökfunktion
      if (onSearchText) {
        const search = onSearchText.toLowerCase();
        filtered = filtered.filter((g) =>
          g.name?.toLowerCase().includes(search)
        );
      }

      // Sortering
      if (selectedRelevance) {
        const key = selectedRelevance.replace("-", "") as keyof Games;
        const reverse = selectedRelevance.startsWith("-");

        filtered.sort((a, b) => {
          const aValue = a[key];
          const bValue = b[key];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return reverse ? bValue - aValue : aValue - bValue;
          }

          if (typeof aValue === "string" && typeof bValue === "string") {
            return reverse
              ? bValue.localeCompare(aValue)
              : aValue.localeCompare(bValue);
          }

          return 0;
        });
      }

      dispatch(gamesReceived(filtered));
    }

    // Om något fel inträffar  uppdatera felstatus i Redux
    if (backendError || rawgError) {
      dispatch(gamesError(backendError || rawgError || "Error fetching games"));
    }
  }, [
    rawgData,
    backendError,
    rawgError,
    selectedGenreId,
    onSearchText,
    selectedPlatformId,
    selectedRelevance,
  ]);

  const renderError = error && !games.length;
  const isLoading = backendLoading || rawgLoading;

  // Skapa en paginerad lista med spel för aktuell sida
  const paginatedGames = games.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  return (
    <>
      {renderError && <Text>Error: {error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} p="10px" gap={4}>
        {isLoading && Skeletons.map((s) => <GameCardSkeleton key={s} />)}
        {status === "succeeded" &&
          paginatedGames.map((g) => <GameCard key={g.id} game={g} />)}
      </SimpleGrid>
      {!isLoading && games.length > GAMES_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(games.length / GAMES_PER_PAGE)}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default GameGrid;
