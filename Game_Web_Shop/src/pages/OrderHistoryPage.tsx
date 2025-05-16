import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Card,
  VStack,
  Spinner,
} from "@chakra-ui/react";

import { OrderHistoryItem } from "@/types/order";
import useGet from "@/hooks/useGet";

const OrderHistoryPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const DATABASE_URL = import.meta.env.VITE_DATABASE_API_URL;
  const {
    data: orders,
    loading,
  } = useGet<OrderHistoryItem[]>(
    user ? `${DATABASE_URL}/api/orders/myorders` : "",
    false,
    '',
    token ? token : ""
  );
  // Om ingen användare är inloggad, omdirigera tilllogin
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Funktion som navigerar till en specifik orderdetaljsida
  const handleViewOrder = (orderId: string) => {
    navigate(`/Order_Details/${orderId}`);
  };

  return (
    <Container maxW="container.lg" mt={8}>
      <Heading as="h2" size="lg" mb={6}>
        Your Order History
      </Heading>

      {loading && (
        <VStack colorPalette="teal">
          <Spinner
            color="red.500"
            css={{ "--spinner-track-color": "colors.gray.200" }}
          />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
      {!loading && orders?.length === 0 && <Text>No orders yet.</Text>}

      <Stack gap={4}>
        {orders.map((order) => (
          <Card.Root
            key={order._id}
            variant="outline"
            borderRadius="md"
            shadow="sm"
          >
            <Card.Body>
              <Stack gap={3}>
                <Heading as="h5" size="md">
                  Order #{order._id}
                </Heading>
                <Text>Name: {order.name}</Text>
                <Text>Email: {order.email}</Text>
                <Text>Tel: {order.telefon?.length > 0 ? order.telefon : ''}</Text>
                <Text>
                  Status: {order.isDelivered ? "Delivered" : "Pending"}
                </Text>
                <Text>Total Price: ${order.totalPrice}</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => handleViewOrder(order._id)}
                  width="fit-content"
                >
                  View Order Details
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
      </Stack>
    </Container>
  );
};

export default OrderHistoryPage;
