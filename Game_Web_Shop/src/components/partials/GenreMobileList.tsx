import { useDispatch, useSelector } from "react-redux";
import genres from "../../data/genres";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Button, Flex, Menu, Portal, Text, Spinner } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { setGenreName, setSelectedGenre } from "@/store/Slices/genreSlice";
import { gamesReceived } from "@/store/Slices/gamesSlice";

const GenreMobileList = () => {
  const dispatch = useDispatch();
  const { selectedGenreId } = useSelector((state: RootState) => state.genre);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [genreLabel, setGenreLabel] = useState("Genre");

  // useEffect körs vid första render för att simulera laddning av genrer
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true); // Starta laddning

        // Simulera nätverksfördröjning
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!genres || genres.length === 0) {
          throw new Error("No genres available");
        }

        setError("");
      } catch (err) {
        setError((err as Error).message || "Failed to load genres");
      } finally {
        setLoading(false); // Avsluta laddning
      }
    };

    loadGenres();
  }, []);

  // Hanterar klick på en genre
  const handleGenreClick = (id: number) => {
    if (id === selectedGenreId) {
      dispatch(setSelectedGenre(0));
      dispatch(setGenreName(""));
      setGenreLabel("All Genres");
      return;
    }
    dispatch(setSelectedGenre(id));
    dispatch(gamesReceived([])); // Rensa spel listan
    const genreName = genres.find((g) => g.id === id); // Hämta namn för valt genre
    dispatch(setGenreName(genreName?.name || ""));
    setGenreLabel(genreName?.name || "");
  };

  const allGenres = [{ id: 0, name: "All Genres" }, ...genres];

  return (
    <>
      <Menu.Root>
      
      {error && !loading && (
        <Text color="red.500" mb={3}>
          Error: {error}
        </Text>
      )}
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm" p=".75rem" rounded={4}>
            <Flex align="center" gap={1}>
              Filter by: {loading ? <Spinner color="blue.500" animationDuration="0.8s" /> : genreLabel}
              <BsChevronDown />
            </Flex>
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {allGenres.map((genre) => (
                <Menu.Item
                  p=".75rem"
                  key={genre.id}
                  value={genre.name}
                  onClick={() => handleGenreClick(genre.id)}
                  cursor="pointer"
                >
                  {genre.name}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export default GenreMobileList;
