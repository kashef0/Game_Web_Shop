import { Box, Button, Heading, Text, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Error from '../assets/Error.png'


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" overflow="hidden">
      <Image 
      position='fixed'
      src={Error}
      top={0}
      left={0}
      width="100%"
      height="100%"
      
      fit='fill'
      zIndex={-1}
       />

      <VStack
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        gap={6}
        textAlign="center"
        zIndex={1}
      >
        <Heading fontSize="6xl">404</Heading>
        <Text fontSize="xl">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button colorScheme="teal" _hover={{bg: 'gray.300'}} size="lg" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
