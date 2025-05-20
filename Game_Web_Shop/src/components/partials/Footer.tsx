import { Box, Flex, Text, Stack, IconButton, Link as ChakraLink } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaFacebook, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.300" py={8} px={4} mt={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="6xl"
        mx="auto"
        justify="space-between"
        align="center"
        gap={6}
      >
        <Stack direction="row" gap={6}>
          <Link to="/about">
            About
          </Link>
          <Link to="/terms">
            Terms
          </Link>
          <Link to="/contact">
            Contact
          </Link>
          <Link to="/PrivacyPolicy">
            Privacy Policy
          </Link>
        </Stack>
        <Text fontSize="sm">
          © {new Date().getFullYear()} GameZone. All rights reserved.
        </Text>


        <Stack direction="row" gap={4}>
          <ChakraLink href="https://github.com">
            <IconButton
              aria-label="GitHub"
              variant="ghost"
              size="sm"
              color="gray.300"
              _hover={{ color: "white", bg: "gray.700" }}
            ><FaGithub /></IconButton>
          </ChakraLink>
          <ChakraLink href="https://twitter.com">
            <IconButton
              aria-label="Twitter"
              variant="ghost"
              size="sm"
              color="gray.300"
              _hover={{ color: "white", bg: "gray.700" }}
            ><FaTwitter /></IconButton>
          </ChakraLink>
          <ChakraLink href="https://facebook.com">
            <IconButton
              aria-label="Facebook"
              variant="ghost"
              size="sm"
              color="gray.300"
              _hover={{ color: "white", bg: "gray.700" }}
            ><FaFacebook /></IconButton>
          </ChakraLink>
          <ChakraLink href="https://discord.com">
            <IconButton
              aria-label="Discord"
              variant="ghost"
              size="sm"
              color="gray.300"
              _hover={{ color: "white", bg: "gray.700" }}
            ><FaDiscord /></IconButton>
          </ChakraLink>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
