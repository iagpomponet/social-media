import { useQueryClient } from "react-query";

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { useLikePost } from "../../services/api";
import { PostProps } from "./Post.types";
import { useState } from "react";

export default function Post({ postData, userData, profileUserData }: PostProps) {
  const [likes, setLikes] = useState(postData?.likes);
  const { mutateAsync } = useLikePost();
  const queryClient = useQueryClient();

  const onLike = async () => {
    //Do some redirect when user is not logged for some reason
    if (!userData?.data) return;

    const userId = userData?.data?._id;
    const isMyIdOnLikesArray = likes.filter((likeUser: string) => likeUser === userId).length;

    const newLikes = isMyIdOnLikesArray ? likes.filter((id) => id !== userId) : [...likes, userId];
    setLikes(newLikes);

    await mutateAsync({
      postId: postData?._id,
      userId: userData?.data?._id,
    });

    queryClient.invalidateQueries("userPosts");
  };

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
      <Avatar name="Profile pic" mr={4} size="sm" src={profileUserData?.profilePic} />
      <Flex flexDirection="column">
        <Text>Test</Text>
        <Text colorScheme="twitter" fontSize="sm">
          {postData?.content}
        </Text>
        <Flex mt={2} alignItems="center">
          <Flex onClick={onLike} cursor="pointer" transition="0.2s" _hover={{ opacity: "0.4" }}>
            {likes?.filter((like: string) => like === userData?.data?._id)?.length === 0 ? <AiOutlineHeart /> : <AiFillHeart />}
          </Flex>
          <Text ml={1} fontSize="sm">
            {likes?.length}
          </Text>
          <Flex cursor="pointer" transition="0.2s" _hover={{ opacity: "0.4" }} ml={4}>
            <AiOutlineComment />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
