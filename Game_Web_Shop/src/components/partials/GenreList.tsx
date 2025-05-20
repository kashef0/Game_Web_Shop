import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, HStack, Text, Image } from "@chakra-ui/react";
import { RootState } from "@/store/store";
import {
  setSelectedGenre,
  setGenreName,
} from "@/store/Slices/genreSlice";
import { gamesReceived } from "@/store/Slices/gamesSlice";
import GenreListSkelton from "./GenreListSkelton";
import CroppedImageUrl from "../../utils/croppedImageUrl";
import genres from "../../data/genres"; 
import { useEffect, useState } from "react";
const Skeletons = [1, 2, 3, 4, 5, 6];


const GenreList = () => {
  const dispatch = useDispatch();
  const { selectedGenreId } = useSelector((state: RootState) => state.genre);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    console.log("id: ", id)
    if (id === selectedGenreId) {
      dispatch(setSelectedGenre(0));
      return;
    }
    dispatch(setSelectedGenre(id));
    dispatch(gamesReceived([])); // Rensa spel listan
    const genreName = genres.find((g) => g.id === id); // Hämta namn för valt genre
    dispatch(setGenreName(genreName?.name || ""));
  };

  return (
    <>
      <Heading fontSize="2xl" mb={3}>
        Genres
      </Heading>

      {loading && Skeletons.map((s) => <GenreListSkelton key={s} />)}
      {error && !loading && (
        <Text color="red.500" mb={3}>
          Error: {error}
        </Text>
      )}
      <Box as="ul">
        {!loading &&
        !error && genres.map((genre) => (
          <Box as="li" key={genre.id} py="5px">
            <HStack>
              <Image
                boxSize="36px"
                borderRadius={8}
                objectFit="cover"
                src={CroppedImageUrl(genre.image_background)}
              />
              <Box
                as="button"
                onClick={() => handleGenreClick(genre.id)}
                fontSize="lg"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                color={genre.id === selectedGenreId ? "red.500" : ""}
                _hover={{ color: "red.500" }}
                textAlign="left"
                whiteSpace="normal"
                wordBreak="break-word"
                cursor="pointer"
              >
                {genre.name}
              </Box>
            </HStack>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default GenreList;
