import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "@/store/store";

import login from "../assets/login.png";

import {
  Box,
  Flex,
  IconButton,
  Badge,
  Image,
  Text,
  Button,
  Portal,
  Popover,
} from "@chakra-ui/react";
import UserMenu from "./UserMenu";

const CartReview = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <Flex align="center" gap={4} position="relative">
      <Box position="relative" display="flex" gap={5}>
        {/* Cart Icon with badge */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <IconButton
              aria-label="Cart"
              variant="plain"
              _hover={
                items.length > 0
                  ? {
                      transform: "rotate(35deg)",
                      filter: "drop-shadow(-10px 0px 10px rgba(255, 255, 255))",
                    }
                  : {}
              }
              transition="transform 0.2s ease-in-out, filter 0.2s ease-in-out"
            >
              <FaShoppingCart />
            </IconButton>
          </Popover.Trigger>

          {items.length > 0 && (
            <Badge
              bg="red.500"
              color="white"
              borderRadius="full"
              position="absolute"
              top={0.5}
              right={16}
              transform="translate(50%, -50%)"
              fontSize="0.7em"
            >
              {items.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          )}

          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Arrow />
                {/* Cart dropdown */}
                {items.length > 0 && (
                  <Box
                    position="absolute"
                    color="black"
                    right={0}
                    mt={2}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    boxShadow="md"
                    w="250px"
                    zIndex={10}
                    p={3}
                  >
                    <Text fontWeight="bold" mb={2}>
                      Cart Preview
                    </Text>
                    <Box>
                      {items.map((item, index) => (
                        <Flex
                          key={`${item.game._id}-${index}`}
                          mb={2}
                          align="center"
                        >
                          {item.game ? (
                            <>
                              <Image
                                src={item.game.background_image}
                                alt={item.game.name}
                                boxSize="40px"
                                borderRadius="md"
                                mr={2}
                              />
                              <Box>
                                <Text fontSize="sm" fontWeight="bold">
                                  {item.game.name}
                                </Text>
                                <Text fontSize="xs" color="gray.800">
                                  quantity: {item.quantity}x
                                </Text>
                                <Text fontSize="xs" color="gray.800">
                                  {item.isRental ? "Rental" : "Buy"}: $
                                  {item.isRental
                                    ? item.game.rentalPrice
                                    : item.game.price}
                                </Text>
                              </Box>
                            </>
                          ) : (
                            <Text fontSize="xs" color="gray.500">
                              Game info is missing
                            </Text>
                          )}
                        </Flex>
                      ))}
                    </Box>
                    <Button
                      size="sm"
                      bg="#29884d"
                      color="white"
                      _hover={{ bg: "#1f5d2e" }}
                      mt={2}
                      w="full"
                      onClick={() => navigate("/cart")}
                    >
                      Go to Cart
                    </Button>
                  </Box>
                )}
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>

        {/* User Menu eller Login */}
        {user ? (
          <Box boxSize='35px'>
          <UserMenu profilePic={user.profilePic} />
          </Box>
        ) : (
          <Box>
            <Link to="/login" className="loginLink">
              <Image src={login} maxW="35px" fit="fill" />
            </Link>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default CartReview;
