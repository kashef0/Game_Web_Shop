import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/store/Slices/authSlice";
import { IoSettingsOutline } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import { FaSignOutAlt } from "react-icons/fa";
import { Menu, Portal, Icon, Image } from "@chakra-ui/react";


type UserMenuProps = {
  profilePic: string;
};

const UserMenu = ({ profilePic }: UserMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Icon bg="gray.300">
          <Image
            boxSize="35px"
            borderRadius="full"
            src={profilePic}
            cursor="pointer"
          />
        </Icon>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Link to="/ProfilePage" style={{ textDecoration: "none" }}>
              <Menu.Item
                value="Setting"
                display="flex"
                alignItems="center"
                cursor="pointer"
              >
                <IoSettingsOutline />
                Setting
              </Menu.Item>
            </Link>

            <Link to="/Order_History" style={{ textDecoration: "none" }}>
              <Menu.Item
                value="Order History"
                display="flex"
                alignItems="center"
                cursor="pointer"
              >
                <GrHistory />
                Order History
              </Menu.Item>
            </Link>

            <Menu.Item
              onClick={handleLogout}
              value="logout"
              bg="red.700"
              color="white"
              _hover={{ bg: "red.600" }}
              display="flex"
              alignItems="center"
              gap={2}
              mt={2}
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
            >
              Logout
              <FaSignOutAlt />
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default UserMenu;
