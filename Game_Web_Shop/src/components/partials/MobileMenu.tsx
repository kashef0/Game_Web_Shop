import {
  Box,
  VStack,
  Flex,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

type MenuItem = {
  label: string;
  to: string;
};

type MobileMenuProps = {
  items: MenuItem[];
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  buttonColor?: string;
  expandedButtonColor?: string;
};

const MobileMenu = ({
  items,
  bgColor,
  hoverColor,
  buttonColor,
  textColor,
  expandedButtonColor,
}: MobileMenuProps) => {

  const fallbackBg = bgColor || "#2c353a";
  const fallbackHover = hoverColor || "#222b2f";
  const fallbackButton = buttonColor || "#38a6a6";
  const fallbackExpandedButton = expandedButtonColor || "#256f6f";

  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isMobile) return null;

  return (
    <Box
      as="header"
      position="relative"
      width="100%"
      overflow="hidden"
      ref={menuRef}
      transition="all 0.3s ease"
      pb={open ? "10px" : "0"}
    >
      <VStack
        gap={0}
        mt="0"
        bg={fallbackBg}
        align="stretch"
        overflow="hidden"
        transition="max-height 0.3s ease"
        maxH={open ? "300px" : "0"}
      >
        {items.map(({ label, to }) => (
          <Link to={to} key={label}>
            <Box
              fontFamily="Allan, serif"
              fontSize="lg"
              textAlign="center"
              color="#848e92"
              lineHeight="60px"
              h={open ? "60px" : "0"}
              borderBottom="1px solid #222b2f"
              transition="all 0.25s ease"
               _hover={{ color: textColor, bg: fallbackHover }}
            >
              {label}
            </Box>
          </Link>
        ))}
      </VStack>

      <Flex justify="center" transition="margin-top 0.3s ease">
        <IconButton
          onClick={() => setOpen(!open)}
          aria-label="Toggle Navigation"
          w="60px"
          h="35px"
          fontSize="1.5rem"
          fontFamily="Allan, serif"
          color="white"
          bg={open ? fallbackExpandedButton : fallbackButton}
          borderBottomRadius="md"
          _hover={{ height: "50px"}}
          transition= "height 0.25s ease" 
        >
          <Box
            as="span"
            transform={`rotate(${open ? "270deg" : "90deg"})`}
            transition="transform 0.25s ease"
          >
            &gt;
          </Box>
        </IconButton>
      </Flex>
    </Box>
  );
};

export default MobileMenu;
