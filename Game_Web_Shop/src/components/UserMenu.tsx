import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/store/Slices/authSlice";
import { IoSettingsOutline } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import { FaSignOutAlt } from "react-icons/fa";
import { Menu, Portal, Icon, Image, Badge } from "@chakra-ui/react";
import { RootState } from "@/store/store";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";

type UserMenuProps = {
  profilePic: string;
};

const UserMenu = ({ profilePic }: UserMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages } = useSelector((state: RootState) => state.message);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const messageCount = messages.filter(
    (m) => !m.adminReply || m.adminReply.trim().length === 0
  ).length;
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

            <Link
              to="/UserInbox"
              className="dropdown-item d-flex justify-content-between align-items-center"
            >
              <Menu.Item
                value="Inkorg"
                display="flex"
                alignItems="center"
                cursor="pointer"
              >
                <HiOutlineInboxArrowDown />
                Inkorg
                {messageCount > 0 && (
                  <Badge
                    colorPalette="red"
                    borderRadius="full"
                    variant='solid'
                    px={2}
                    fontSize="0.8em"
                    ml={2}
                  >
                    {messageCount}
                  </Badge>
                )}
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
