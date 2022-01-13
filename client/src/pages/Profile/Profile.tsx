import { Avatar } from "@chakra-ui/avatar";
import { Flex, Stack, Container } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useParams } from "react-router";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";



import { useGetUser, useGetUserPosts } from "../../services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import Post from "../../components/Post";

export default function Profile() {
  const { userData } = useAuth();
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: Build edit profile feature
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  const { data: profileUserData, isLoading } = useGetUser(id || "");
  const { data: posts, isLoading: isPostsLoading } = useGetUserPosts(profileUserData?._id);

  const onSubmit = (data: any) => {
    console.log("data :>> ", data);
  };

  return (
    <Flex height="100%">
      {isLoading ? (
        <Flex alignItems="center" er margin="0 auto">
          <Spinner color="purple" />
        </Flex>
      ) : null}
      {profileUserData ? (
        <Flex flexDirection="column" width="100%" height="100%">
          <Flex display="flex" p={4} height="180px" shadow="base" margin="0 auto" alignItems="center" width="100%">
            <Flex margin="0 auto" alignItems="center" maxWidth="900px" width="100%" height="100%">
              <Avatar size="2xl" src={profileUserData?.profilePic} />
              <Stack ml={4} mt="auto" mb="auto">
                <Text>
                  {profileUserData?.firstName}
                  {profileUserData?.lastName}
                </Text>
                <Text mb={4} fontWeight="light" fontSize="sm">
                  {profileUserData?.description}
                </Text>
                {userData?.data?._id === profileUserData?.data?._id && (
                  <Button onClick={onOpen} colorScheme="purple" maxWidth="100px" fontSize="sm">
                    Edit
                  </Button>
                )}
              </Stack>
            </Flex>
          </Flex>

          <Container boxShadow="base" height="100%" py={8}>
            <Flex flexDirection="column" alignItems="flex-start" justifyContent="space-between" width="100%">
              <Flex width="100%" flexDirection="column">
                <Flex width="100%">
                  <Avatar mr={4} size="sm" src={userData?.data?.profilePic} />
                  <Flex width="100%" flexDirection="column">
                    <Textarea resize="none" fontSize="sm" placeholder="What's happening?" />
                    <Button mt={2} colorScheme="purple" maxWidth="100px" fontSize="sm">
                      Publish
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Stack width="100%" mt={8}>
              {isPostsLoading ? (
                <Flex margin="0 auto">
                  <Spinner />
                </Flex>
              ) : null}
              {posts?.map((post) => {
                return (
                  <Post userData={userData} profileUserData={profileUserData} postData={post} />
                );
              })}
            </Stack>
          </Container>
        </Flex>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple">Edit</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input fontSize="sm" mb={2} mr={1} placeholder="First Name" {...register("firstName", { required: true })} />
              <Input fontSize="sm" mb={2} placeholder="Last Name" {...register("lastName", { required: true })} />
              <Textarea fontSize="sm" mb={2} placeholder="Description" {...register("description", { required: true })} />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" fontSize="sm" colorScheme="purple">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
