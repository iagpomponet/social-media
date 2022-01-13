import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { PostProps } from "./Post.types";

export default function Post({ postData, userData, profileUserData }: PostProps) {
  return (
    <Box
      key={postData._id}
      maxWidth="100%"
      width="100%"
      display="flex"
      py={4}
      borderTop="none"
      borderRight="none"
      borderLeft="none"
      borderWidth="1px"
      overflow="hidden"
    >
      <Avatar mr={4} size="sm" src={profileUserData?.profilePic} />
      <Flex flexDirection="column">
        <Text colorScheme="twitter" fontSize="sm">
          {postData?.content}
        </Text>
        <Flex mt={2} alignItems="center">
          <Flex cursor="pointer" transition="0.2s" _hover={{ opacity: "0.4" }}>
            {postData?.likes?.filter((like: string) => like === userData?.data?._id)?.length === 0 ? <AiOutlineHeart /> : <AiFillHeart />}
          </Flex>
          <Text ml={1} fontSize="sm">
            {postData?.likes?.length}
          </Text>
          <Flex cursor="pointer" transition="0.2s" _hover={{ opacity: "0.4" }} ml={4}>
            <AiOutlineComment />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
