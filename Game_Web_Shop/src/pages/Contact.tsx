import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  Field,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box maxW="600px" mx="auto" mt={10} p={6}>
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={6}
        boxShadow="md"
      >
        <Heading mb={4}>Contact Us</Heading>
        <Text mb={6}>Have a question or feedback? Reach out below.</Text>
        <VStack gap={4} as="form">
          <Field.Root required>
            <Field.Label>Name</Field.Label>
            <Input placeholder="Your name" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="Your email" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Message</Field.Label>
            <Textarea placeholder="Write your message..." />
          </Field.Root>

          <Button type="submit" bg="blue.600" color='white' _hover={{bg: 'blue.700' }} w="full">
            Send Message
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Contact;
