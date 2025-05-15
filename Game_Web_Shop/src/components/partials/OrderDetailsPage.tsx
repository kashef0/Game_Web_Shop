
import useGet from "@/hooks/useGet";
import { GameDetails } from "@/types/Game";
import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  Skeleton,
  Badge,
  SimpleGrid,
  Spinner,
  Span,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useEffect, useState } from "react";

type Game = {
  _id: string;
  rawgId: number;
  price: number;
  rentalPrice?: number;
  availableForRent: boolean;
};

type Order = {
  _id: string;
  isDelivered: boolean;
  totalPrice: number;
  createdAt: string;
  items: {
    game: Game;
    quantity: number;
    isRental: boolean;
  }[];
};

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const DATABASE_URL = import.meta.env.VITE_DATABASE_API_URL;
  const authToken = localStorage.getItem("token") || "";

  
  const [gameDetails, setGameDetails] = useState<GameDetails[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  // Hämta orderdata med useGet
  const {
    data: order,
    loading: orderLoading,
    error: orderError,
  } = useGet<Order>(
    `${DATABASE_URL}/api/orders`,
    true,
    orderId,
    authToken
  );

  useEffect(() => {
    // Funktion som hämtar detaljerad information om varje spel i en beställning
    const fetchGameDetails = async () => {
      if (!order?.items?.length) {
        setGameDetails([]);
        return;
      }

      setLoadingGames(true);
      try {
        // Promise.all för att köra flera fetch
        const details = await Promise.all(
          order.items.map(async (item) => {
            try {
              // Hämta speldata från API för varje item
              const response = await fetch(
                `${API_URL}/games/${item.game.rawgId}?key=${API_KEY}`
              );
              if (!response.ok) throw new Error("Failed to fetch game");
              return await response.json();
            } catch (error) {
              console.error(`Error fetching game ${item.game.rawgId}:`, error);
              return null;
            }
          })
        );
        setGameDetails(details);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingGames(false);
      }
    };

    fetchGameDetails();
  }, [order, API_URL, API_KEY]);

  if (!orderId) {
    return <Text>Invalid Order ID</Text>;
  }

  if (orderLoading) {
    return (
      <VStack gap={4} align="stretch">
        <Skeleton height="40px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </VStack>
    );
  }

  if (orderError) {
    return (
      <Text color="red.500">Error loading order details: {orderError}</Text>
    );
  }

  if (!order) {
    return null;
  }

  const handleGameClick = (id: number) => {
    navigate(`/game/details/${id}`);
  };

  return (
    <Flex
      direction="column"
      maxW="container.lg"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h2" size="xl" mb={4} color="gray.300">
            Order Summary
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
            <Box>
              <Text fontSize="sm" color="gray.300">
                Order ID
              </Text>
              <Text fontSize="md" fontWeight="medium">
                {order._id}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.300">
                Status
              </Text>
              <Badge
                fontSize="md"
                colorScheme={order.isDelivered ? "green" : "orange"}
                px={2}
                py={1}
                borderRadius="full"
              >
                {order.isDelivered ? "Delivered" : "Processing"}
              </Badge>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.300">
                Date
              </Text>
              <Text fontSize="md" fontWeight="medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.300">
                Total Amount
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.600">
                ${order.totalPrice > 0 ? order.totalPrice.toFixed(2) : 0}
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box>
          <Heading as="h3" size="md" mb={4} color="gray.300">
            Order Items
          </Heading>

          {loadingGames ? (
            <Flex justify="center" py={8}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack gap={4} align="stretch">
              {order && Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, index) => {
                  const rawgGame = gameDetails[index];
                  const subtotal =
                    item.quantity *
                    (item.isRental
                      ? item.game.rentalPrice ?? 0
                      : item.game.price ?? 0);

                  return (
                    <Flex
                      key={item.game._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      scale='.97'
                      borderColor="gray.200"
                      _hover={{ scale: "1" }}
                      transition='scale .4s ease-in-out'
                    >
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={4}
                        w="100%"
                      >
                        <Image
                          src={
                            rawgGame?.background_image ||
                            "/placeholder-game.jpg"
                          }
                          alt={rawgGame?.name || "Game cover"}
                          width={160}
                          height={90}
                          objectFit="cover"
                          borderRadius="md"
                          cursor="pointer"
                          onClick={() =>
                            rawgGame?.id && handleGameClick(rawgGame.id)
                          }
                        />

                        <Box flex={1}>
                          <Heading as="h3" size="sm" mb={2}>
                            Game: <Span color='red.500'>{rawgGame?.name || item.game._id}</Span>
                          </Heading>

                          <Flex wrap="wrap" gap={4} mt={2}>
                            <Badge
                              colorScheme={item.isRental ? "purple" : "blue"}
                              variant="subtle"
                            >
                              {item.isRental ? "Rental" : "Purchase"}
                            </Badge>

                            <Text fontSize="sm">
                              <Text as="span" fontWeight="medium">
                                Qty:
                              </Text>{" "}
                              {item.quantity}
                            </Text>

                            <Text fontSize="sm">
                              <Text as="span" fontWeight="medium">
                                Price:
                              </Text>{" "}
                              $
                              {item.isRental
                                ? item.game.rentalPrice?.toFixed(2) ?? "0.00"
                                : item.game.price?.toFixed(2) ?? "0.00"}
                            </Text>

                            <Text fontSize="sm">
                              <Text as="span" fontWeight="medium">
                                Subtotal:
                              </Text>{" "}
                              ${subtotal.toFixed(2)}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Flex>
                  );
                })
              ) : (
                <Text>No items found in this order.</Text>
              )}
            </VStack>
          )}
        </Box>
      </VStack>

      <Button
        mt={8}
        alignSelf="flex-start"
        variant="outline"
        onClick={() => navigate(-1)}
        colorScheme="blue"
        size="lg"
      >
        <TiArrowBack />
        Back to Orders
      </Button>
    </Flex>
  );
};

export default OrderDetailsPage;
