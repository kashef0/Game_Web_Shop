import useGet from "@/hooks/useGet";
import { FetchGameRes, Games } from "@/types/Game";
import { SimpleGrid } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const [game, setGame] = useState<Games[]>([]);
  const {
    data: dataGames,
    error: gameError,
    loading: gameLoading,
  } = useGet<FetchGameRes>(
    "https://api.rawg.io/api/games?key=50751b6830054f0db8a5d86353d357d4",
    true
  );
  useEffect(() => {
    if (dataGames?.results) {
      setGame(dataGames.results);
    }
  }, [dataGames]);

  const renderError = gameError && !dataGames;
  const Skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {renderError && <p>Error: {gameError}</p>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} p="10px" gap={10}>
      {gameLoading &&
        Skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {game.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
