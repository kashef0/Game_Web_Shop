import { useParams } from "react-router-dom";
import { Box, Heading, Text, Stack, Separator, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Receipt: React.FC = () => {
  // Hämtar order id från URL parametrarna
  const { id } = useParams();
  // Hämtar den aktuella ordern från Redux store baserat på ID
  const order = useSelector((state: RootState) =>
    state.orders.orders.find((order) => order._id === id)
  );

  if (!order) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text fontSize="lg">Loading receipt...</Text>
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" minH="100vh" p={4}>
      <Box
        p={8}
        rounded="xl"
        shadow="lg"
        w="full"
        maxW="500px"
        border="1px solid"
      >
        <Heading size="lg" textAlign="center" mb={6}>
          Order Confirmation
        </Heading>

        <Stack gap={4}>
          <Box>
            <Text fontSize="sm">Order Number</Text>
            <Text fontSize="md" fontWeight="medium">
              {order._id || "N/A"}
            </Text>
          </Box>

          <Separator />

          <Box>
            <Text fontSize="sm">Total Amount</Text>
            <Text fontSize="md" fontWeight="medium">
              {order.totalPrice ? `${order.totalPrice} SEK` : "N/A"}
            </Text>
          </Box>

          <Separator />

          <Box textAlign="center" mt={6}>
            <Text fontSize="md" fontWeight="semibold">
              Thank you for your purchase!
            </Text>
            <Text fontSize="sm" mt={2}>
              A confirmation email has been sent to your inbox.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Receipt;
