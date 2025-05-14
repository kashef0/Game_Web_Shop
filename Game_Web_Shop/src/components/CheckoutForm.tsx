
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Flex,
  Alert,
  createListCollection,
  Field,
} from "@chakra-ui/react";
import SelectPaymentMethod from "./SelectPaymentMethod";
import { clearCart } from "@/store/Slices/cartSlice";
import usePost from "@/hooks/usePost";
import { orderAdded } from "@/store/Slices/ordersSlice";
import { CreateOrderRequest} from "@/types/order";

const CheckoutForm: React.FC = () => {
  const dispatch = useDispatch(); 
  const { items } = useSelector((state: RootState) => state.cart); // Hämtar produkter från kundvagnen
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telefon, setTelefon] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string[]>(["Credit Card"]);
  
  const navigate = useNavigate();

  const DATABASE_API_URL = import.meta.env.VITE_DATABASE_API_URL;
  // Använder usePost hooken för att skapa en order
  const { data, error, loading, postData } = usePost<any>(`${DATABASE_API_URL}/api/orders`);

  // Funktion som körs när användaren bekräftar beställningen
  const handleSubmit = async () => {
    if (!localStorage.getItem("token")) {
      alert("you should login....");
      return;
    }
    
    // mappa produkter till rätt format
    const mappedItems = items.map((item: any) => ({
      game: item.game.id,
      quantity: item.quantity,
      isRental: item.isRental,
      rentalDuration: item.isRental ? item.rentalDuration : 0,
    }));
    
    // Bygg ordern
    const orderRequest: CreateOrderRequest = {
      items: mappedItems,
      paymentMethod: paymentMethod[0],
      name,
      email,
      address,
      telefon,
      
    };
    
    // Skicka beställning till servern
    try {
      const result = await postData(orderRequest);
      if (result) {
        dispatch(orderAdded(result));  // Lägg till order i Redux
        alert(`Order created!\nOrder ID: ${result._id}\nTotal: ${result.totalPrice} SEK`);
        dispatch(clearCart()); // Töm kundvagn
        localStorage.removeItem("cart");
        navigate(`/receipt/${result._id}`); 
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };
  

  const frameworks = createListCollection({
    items: [
      { label: "Credit Card", value: "Credit Card" },
      { label: "PayPal", value: "PayPal" },
      { label: "Swish", value: "Swish" },
    ],
  });

  return (
    <Flex justify="center" align="center" minH="100vh" p={4}>
      <Box
        p={8}
        rounded="xl"
        shadow="lg"
        w="full"
        maxW="500px"
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading size="lg" mb={6} textAlign="center">
          Checkout
        </Heading>

        <Stack gap={4}>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Address</Field.Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Phone Number</Field.Label>
            <Input
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="Enter your phone number"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Payment Method</Field.Label>
            <SelectPaymentMethod
              collection={frameworks}
              value={paymentMethod}
              onChange={(val) => setPaymentMethod(val)}
            />
          </Field.Root>

          <Button
            colorScheme="green"
            size="lg"
            mt={4}
            loading={loading}
            onClick={handleSubmit}
            w="full"
          >
            Confirm Order
          </Button>

          {error && (
            <Alert.Root status="info" mt={4} rounded="md">
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}
          {data && data.length !== 0 && (
            <Alert.Root status="success" mt={4} rounded="md">
              <Alert.Indicator />
              <Alert.Title>{data}</Alert.Title>
            </Alert.Root>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default CheckoutForm;


