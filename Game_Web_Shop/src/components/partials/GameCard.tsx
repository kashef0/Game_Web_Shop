
import { Button, Card, HStack, Text, Image, Flex, Box } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import croppedImageUrl from "../../utils/croppedImageUrl";
import { useNavigate } from "react-router-dom";
import Emoji from "./Emoji";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, CartItem } from "@/store/Slices/cartSlice";
import { FullGame, Games, GameTrailer } from "@/types/Game";
import { useColorMode } from "../ui/color-mode";
import { RootState } from "@/store/store";

import useGet from "@/hooks/useGet";
import { useState } from "react";
import GameVideo from "../GameVideo";

// Add these interfaces below the imports
interface BackendGameData {
  _id: string;
  rawgId: number;
  price: number;
  rentalPrice?: number;
  availableForRent: boolean;
}

interface Props {
  game: FullGame;
}

const GameCard: React.FC<Props> = ({ game }) => {
  const { items } = useSelector((state: RootState) => state.cart);

  const { colorMode } = useColorMode();  // Hämtar nuvarande färgläge
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isHovered , setIsHovered] = useState(false); // Håller koll på om kortet är överfört med musen
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { data: gamePreview } = useGet<GameTrailer>(
    `${API_URL}/games/${game.rawgId}/movies?key=${API_KEY}`,
    isHovered // Om musen är över kortet, hämta trailern
  );
  console.log("showPreview", gamePreview);

  const handleSubmit = (id: number) => {
    navigate(`/game/details/${id}`); // Navigera till speldetaljsidan
  };

  // Hanterar logiken för att lägga till ett spel i varukorgen
  const handleAddToCart = (
    backendGame: BackendGameData,
    rawgGame: Games,
    isRental: boolean,
    rentalDuration: number = 1
  ) => {
    const alreadyRented = items.find(
      (item: CartItem) => item.game._id === backendGame._id && item.isRental
    );
    if (isRental && alreadyRented) {
      alert("You already rented this game. You can only rent it once.");
      return;
    }
    // dispatcha action för att lägga till spelet i varukorgen
    dispatch(
      addToCart({
        game: { ...backendGame, ...rawgGame },
        quantity: 1,
        isRental,
        rentalDuration: isRental ? rentalDuration : 0,
      })
    );
    alert(`${rawgGame.name} added to cart`);
  };

  return (
    <Card.Root
      maxW="sm"
      borderRadius={10}
      overflow="hidden"
      _hover={{ scale: "1.03" }}
      transition="scale .3s ease-in-out"
    >
      <Box
        onMouseEnter={() => {
          setIsHovered(true);
          
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          
        }}
        height="200px"
        position="relative"
      >
        {isHovered && gamePreview?.results?.length ? (
          <GameVideo trailer={gamePreview.results[0]} />
        ) : (
          <Image
            fit="fill"
            src={croppedImageUrl(game.background_image) || ""}
            height="200px"
            alt={game.name}
            width="100%"
          />
        )}
      </Box>

      <Card.Body
        gap={2}
        onClick={() => handleSubmit(game.rawgId)}
        cursor="pointer"
      >
        <Card.Title fontSize="1.6rem" _hover={{ textDecoration: "underline" }}>
          {game.name}
        </Card.Title>
        <HStack justifyContent="space-between">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          {game.metacritic > 0 ? <CriticScore score={game.metacritic} /> : ""}
        </HStack>
        <Emoji rating={game.rating_top} />
        <Flex direction="column" gap={1}>
          <Flex justify="space-between" align="center">
            <Text
              fontWeight="medium"
              color={colorMode === "light" ? "gray.900" : "gray.300"}
            >
              Buy:
            </Text>
            <Text fontWeight="bold" color="green.500">
            {game.price} SEK
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text
              fontWeight="medium"
              color={colorMode === "light" ? "gray.900" : "gray.300"}
            >
              Rent (30 days):
            </Text>
            <Text fontWeight="bold" color="blue.500">
           {game.rentalPrice} SEK
            </Text>
          </Flex>
        </Flex>
      </Card.Body>
      <Card.Footer gap="2">
        <Button
          variant="solid"
          onClick={
            () => handleAddToCart(game, game, false) // For Buy button
          }
        >
          Buy now
        </Button>
        {game.availableForRent && (
          <Button
            variant="ghost"
            _hover={{ bg: "gray.700" }}
            onClick={
              () => handleAddToCart(game, game, true, 30) // For Rent button
            }
          >
            Rent 30 Days
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default GameCard;
