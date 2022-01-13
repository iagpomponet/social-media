import { Text, Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function Header() {
  const { userData } = useAuth();

  return (
    <Flex justifyContent="space-between" borderBottom="1px solid rgba(0,0,0,0.1)" p={4}>
      <Text maxWidth="100px" fontSize="xl" color="purple" fontWeight="bold" letterSpacing="-2px" lineHeight="20px">
        A Social Network
      </Text>
      {userData?.isLogged && (
        <Link to={`/profile/${userData?.data?._id}`}>
          <Flex
            _hover={{
              opacity: "0.4",
            }}
            height="100%"
            alignItems="center"
            transition="0.2s"
          >
            <Text fontSize="sm" color="purple" mr={2}>
              {userData?.data?.firstName}
            </Text>
            <Avatar size="sm" src={userData?.data?.profilePic}></Avatar>
          </Flex>
        </Link>
      )}
    </Flex>
  );
}
