import { Box, Heading, Text, Stack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box maxW="800px" minH='70vh' mx="auto" mt={10} p={6}>
        <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={6}
        boxShadow="md"
      >
      <Heading mb={4}>About GameZone</Heading>
      <Stack gap={4}>
        <Text>
          GameZone is your go-to platform for discovering, renting, and buying games across all platforms.
        </Text>
        <Text>
          We started with one goal: make gaming accessible and affordable. With our flexible rental model, you get more for less.
        </Text>
        <Text>
          Whether you're a casual gamer or hardcore player, we aim to serve you better with every update.
        </Text>
      </Stack>
      </Box>
    </Box>
  );
};

export default About;
