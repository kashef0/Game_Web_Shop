import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Spinner,
  Image,
  Link,
  Stack,
  Separator,
  Badge,
  Flex,
} from "@chakra-ui/react";
import useGet from "@/hooks/useGet";
import { GameDetails } from "@/types/Game";
import { useColorMode } from "../ui/color-mode";
import croppedImageUrl from "@/utils/croppedImageUrl";


const GameDetail = () => {
  const { id } = useParams(); // Hämtar spel id från URL
  const { colorMode } = useColorMode()
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `${API_URL}/games/${id}?key=${API_KEY}`;

  // Hämtar speldetaljer via hook
  const {
    data: dataGames,
    error: gameError,
    loading: gameLoading,
  } = useGet<GameDetails>(url, true);
 
  // Tar bort HTML taggar från beskrivning
  const stripHtml = (html: string | undefined): string => {
    return html ? html.replace(/<[^>]+>/g, "") : "";
  };

  if (gameLoading) return <Spinner size="xl" />;
  if (gameError) return <Text color="red.500">{gameError}</Text>;
  if (!dataGames) return null;
  return (
    <Box maxW="5xl" mx="auto" p={6}>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        {dataGames.name}
      </Text>

      {dataGames.background_image && (
        <Image
          src={croppedImageUrl(dataGames.background_image)}
          alt={dataGames.name}
          borderRadius="lg"
          mb={6}
          objectFit="cover"
          w="100%"
          maxH="500px"
        />
      )}

      <Stack gap={4}>
        {dataGames.description && (
          <Text fontSize="md" color={colorMode === 'dark' ? "gray.300" : "gray.800"}>
            {stripHtml(dataGames.description)}
          </Text>
        )}

        <Separator />

        <Flex gap={4} flexWrap="wrap">
          <Badge colorScheme="purple">
            Released: {new Date(dataGames.released).toLocaleDateString()}
          </Badge>
          <Badge colorScheme="green">
            Metacritic: {dataGames.metacritic ?? "N/A"}
          </Badge>
          <Badge colorScheme="blue">Rating: {dataGames.rating}/5</Badge>
          <Badge colorScheme="orange">Playtime: {dataGames.playtime} hrs</Badge>
        </Flex>

        <Box mt={4}>
          <Text fontWeight="bold">Platforms:</Text>
          {dataGames.platforms?.map((p, i) => (
            <Text key={i}>{p.platform.name}</Text>
          ))}
        </Box>

        <Box mt={4}>
          
        </Box>

        <Box>
          <Text fontWeight="semibold">Official Website:</Text>
          <Link href={dataGames.website} color="teal.500">
            {dataGames.website}
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default GameDetail;
