import { Box, Flex, HStack, Image, useBreakpointValue } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import CartReview from "../CartReview";
import { useColorMode } from "../ui/color-mode";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
  const isBelow450 = useBreakpointValue({ base: true, sm: false }); // Kollar om skärmstorleken är 450px eller mindre
  const isSearchMobile = useBreakpointValue({ base: true, lg: false }); // Kollar om skärmen är mindre än 'lg'
  // const [open, setOpen] = useState(false);

  const { colorMode } = useColorMode();

  return (
    <>
      <HStack justifyContent="space-between" padding="10px" marginX={2}>
        <HStack justify="start" w="100%">
          <Link to="/">
            <Box
              fontFamily="fantasy"
              as="h1"
              display="flex"
              alignItems="center"
            >
              <Image src={logo} boxSize="60px" fit="inherit" />
            </Box>
          </Link>

          {!isBelow450 && (
            <>
              <Link to="/">
                <Box
                  transition="color 0.3s ease"
                  fontFamily="fantasy"
                  as="h1"
                  ml="3rem"
                  display="flex"
                  alignItems="center"
                  _hover={{
                    color: colorMode === "dark" ? "#c62143" : "#9a1838",
                  }}
                >
                  Home
                </Box>
              </Link>
              <Link to="/about">
                <Box
                  whiteSpace="nowrap"
                  transition="color 0.3s ease"
                  fontFamily="fantasy"
                  as="h1"
                  ml="1rem"
                  display="flex"
                  alignItems="center"
                  _hover={{
                    color: colorMode === "dark" ? "#c62143" : "#9a1838",
                  }}
                >
                  About us
                </Box>
              </Link>
            </>
          )}
          {!isSearchMobile && (
            <Box className="searchForm" display="flex" justifyContent="center">
              <SearchInput />
            </Box>
          )}
        </HStack>

        <HStack display="flex" justify="end" gap={6}>
          <ColorModeSwitch />
          <CartReview />
        </HStack>
      </HStack>

      {isBelow450 && (
        <MobileMenu
          items={[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
          ]}
          bgColor={colorMode === "dark" ? "#2c353a" : "#fff"}
          hoverColor="#222b2f"
          textColor={colorMode === "dark" ? "#c62143" : "#9a1838"}
          buttonColor="#38a6a6"
          expandedButtonColor="#256f6f"
        />
      )}

      {isSearchMobile && (
        <Flex m={2} justifyContent="center">
          <Box
            width="md"
            w="75%"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            _hover={{ width: "100%" }}
            transition="width .7s ease-in-out"
          >
            <SearchInput />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default NavBar;
