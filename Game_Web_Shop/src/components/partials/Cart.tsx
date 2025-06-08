import { removeFromCart } from "@/store/Slices/cartSlice";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart); // Hämtar varukorgens artiklar från redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Beräknar totalbeloppet i varukorgen
  const total = items.reduce((acc, item) => {
    const price = item.isRental ? item.game.rentalPrice : item.game.price;
    if (price != null) {
      return acc + price * item.quantity;
    }
    return acc;
  }, 0);

  const handleRemove = (id: string, isRental: boolean) => {
    // för att ta bort en vara från varukorgen
    dispatch(removeFromCart({ id, isRental }));
    toaster.create({
      title: "Removed from cart",
      description: "The item has been removed.",
      type: "success",
    });
  };

  const handleCheckout = () => {
    toaster.create({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment...",
      type: "info",
    });
    // för att navigera till checkout sidan
    navigate("/checkout");
  };

  return (
    <Box maxW="container.lg" mx="auto" p={6}>
      <Heading size="lg" mb={6}>
        Your Cart
      </Heading>

      {items.length === 0 ? (
        <Text fontSize="lg">No items in cart.</Text>
      ) : (
        <VStack gap={4} align="stretch" w="50%">
          {items.map((item) => (
            <Flex
              justify="space-between"
              key={item.game.id}
              borderWidth="1px"
              borderRadius="2xl"
              p={4}
              shadow="sm"
            >
              <HStack align="flex-start">
                <Image
                  src={item.game.background_image}
                  boxSize="10rem"
                  fit="fill"
                  rounded="md"
                />
                <Box marginLeft={2}>
                  <Heading size="md" mb={2}>
                    {item.game.name}
                  </Heading>
                  <Text>Purchase type: {item.isRental ? "Rental" : "Buy"}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>
                    Price per unit: $
                    {item.isRental ? item.game.rentalPrice : item.game.price}
                  </Text>
                  {item.isRental && (
                    <Text>Rental Duration: {item.rentalDuration} days</Text>
                  )}
                </Box>
              </HStack>
              <Button
                bg="red.700"
                color="white"
                _hover={{ bg: "red.600" }}
                variant="outline"
                size="sm"
                onClick={() => handleRemove(item.game._id, item.isRental)}
              >
                Remove
              </Button>
            </Flex>
          ))}

          <Separator my={4} />

          <HStack justify="space-between">
            <Heading size="md">Total</Heading>
            <Text fontWeight="bold" fontSize="lg">
              ${total.toFixed(2)}
            </Text>
          </HStack>

          <Button
            bg="green.700"
            color="white"
            _hover={{ bg: "green.600" }}
            size="lg"
            mt={4}
            alignSelf="flex-end"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;
