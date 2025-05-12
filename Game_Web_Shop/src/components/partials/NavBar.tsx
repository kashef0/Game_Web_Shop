import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import CartReview from "../CartReview";
import { useEffect, useRef, useState } from "react";
import { useColorMode } from "../ui/color-mode";

const NavBar = () => {
  const isBelow450 = useBreakpointValue({ base: true, sm: false }); // Kollar om skärmstorleken är 450px eller mindre
  const isSearchMobile = useBreakpointValue({ base: true, lg: false }); // Kollar om skärmen är mindre än 'lg'
  const [open, setOpen] = useState(false);

  const { colorMode } = useColorMode();

  // referens till menyboxen för att kunna kolla klick utanför
  const menuRef = useRef<HTMLDivElement | null>(null);

  // useEffect körs vid mount och sätter upp en event listener för klick utanför menyn
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Lägg till lyssnare för klick
    document.addEventListener("mousedown", handleClickOutside);

   // Rensa upp event listenern när komponenten tas bort
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                    color: colorMode ? "#c62143" : "#9a1838",
                  }}
                >
                  Home
                </Box>
              </Link>
              <Link to="/about">
                <Box
                whiteSpace='nowrap'
                  transition="color 0.3s ease"
                  fontFamily="fantasy"
                  as="h1"
                  ml="1rem"
                  display="flex"
                  alignItems="center"
                  _hover={{
                    color: colorMode ? "#c62143" : "#9a1838",
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


        <HStack display='flex' justify='end' gap={6}>
        <ColorModeSwitch />
          <CartReview />
        </HStack>
      </HStack>

      {isBelow450 && (
        <Flex justify="center" mt={2} flexDirection="column" align="center" >
          <Box
            as="div"
            transition="max-height 0.3s ease-in-out, padding 0.3s ease-in-out"
            maxHeight={open ? "200px" : "0"}
            overflow="hidden"
            pt={open ? 2 : 0}
            pb={open ? 4 : 0}
          >
            <VStack gap={2} align="center" mt={2}>
              <Link to="/">
                <Box
                  transition="color 0.3s ease"
                  fontFamily="fantasy"
                  py={2}
                  fontSize="lg"
                  _hover={{
                    color: colorMode ? "#c62143" : "#9a1838",
                  }}
                >
                  Home
                </Box>
              </Link>
              <Link to="/about">
                <Box
                  transition="color 0.3s ease"
                  fontFamily="fantasy"
                  py={2}
                  fontSize="lg"
                  _hover={{
                    color: colorMode ? "#c62143" : "#9a1838",
                  }}
                >
                  About us
                </Box>
              </Link>
            </VStack>
          </Box>
          <Box ref={menuRef}>
            <IconButton
              aria-label="Toggle menu"
              variant="ghost"
              onClick={() => setOpen(!open)}
              size="lg"
            >
              {!open ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </IconButton>
          </Box>
        </Flex>
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
