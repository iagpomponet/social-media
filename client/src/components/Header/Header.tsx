import { Text, Flex, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useSignOut } from "../../services";

export default function Header() {
  const { userData } = useAuth();
  const { mutateAsync } = useSignOut();

  const handleSignOut = async () => {
    await mutateAsync();
    window.location.reload();
  };

  return (
    <Flex justifyContent="space-between" borderBottom="1px solid rgba(0,0,0,0.1)" p={4}>
      <Text maxWidth="100px" fontSize="xl" color="purple" fontWeight="bold" letterSpacing="-2px" lineHeight="20px">
        A Social Network
      </Text>
      <p>{userData?.isLogged ? "logged" : "not logged"}</p>
      {userData?.isLogged && (
        <div>
          <Flex height="100%" alignItems="center" transition="0.2s">
            <Menu isLazy>
              <MenuButton>
                <Flex alignItems="center">
                  <Text fontSize="sm" color="purple">
                    {userData?.data?.firstName}
                  </Text>
                  <Avatar ml={3} size="sm" src={userData?.data?.profilePic}></Avatar>
                </Flex>
              </MenuButton>
              <MenuList>
                <Link to={`/profile/${userData?.data?._id}`}>
                <MenuItem fontSize="sm">Profile</MenuItem>
                </Link>
                <MenuItem fontSize="sm" onClick={handleSignOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </div>
      )}
    </Flex>
  );
}
