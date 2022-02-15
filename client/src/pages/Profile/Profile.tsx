import { Avatar } from "@chakra-ui/avatar";
import { Flex, Stack, Container, Box } from "@chakra-ui/layout";
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

import { useEditUser, useGetUser, useGetUserPosts } from "../../services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import Post from "../../components/Post";
import { useQueryClient } from "react-query";
import { AiOutlineCamera } from "react-icons/ai";

import * as css from "./Profile.styles";
import { useUploadImage } from "../../services/cloudinary";

export default function Profile() {
  const queryClient = useQueryClient();
  const [profilePicPreview, setProfilePicPreview] = useState();

  const { userData, setUserData } = useAuth();
  const { register, handleSubmit, reset, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading: isEditUserLoading } = useEditUser();
  const { mutateAsync: uploadImage } = useUploadImage();

  const { id } = useParams();

  const profilePic = getValues("profilePic");

  const { data: profileUserData, isLoading } = useGetUser(id || "");
  const { data: posts, isLoading: isPostsLoading } = useGetUserPosts(profileUserData?._id);

  const onSubmit = async (data: any) => {
    const userId = userData?.data?._id;

    if (userId) {
      if (data?.profilePic?.length) {
        const uploadFormData = new FormData();

        for (let i = 0; i < data?.profilePic?.length; i++) {
          let file = data?.profilePic[i];
          uploadFormData.append("file", file);
        }

        uploadFormData.append("upload_preset", "px7rrl8n");

        const {
          data: { secure_url },
        } = await uploadImage(uploadFormData);
        data.profilePic = secure_url;
      } else {
        delete data.profilePic;
      }

      await mutateAsync({
        payload: data,
        id: userId,
      });

      onClose();
      queryClient.invalidateQueries("user");
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        firstName: profileUserData?.firstName,
        lastName: profileUserData?.lastName,
        description: profileUserData?.description,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (profilePic && profilePic.length) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        if (reader.result) {
          setProfilePicPreview(reader.result as any);
        }
      });

      reader.readAsDataURL(profilePic[0]);
    }
  }, [profilePic]);

  useEffect(() => {
    if (profileUserData && JSON.stringify(profileUserData) !== JSON.stringify(userData)) {
      setUserData({
        isLogged: true,
        data: profileUserData,
      });
    }
  }, [profileUserData]);

  return (
    <Flex height="100%">
      {isLoading ? (
        <Flex alignItems="center" er margin="0 auto">
          <Spinner color="purple" />
        </Flex>
      ) : null}
      {profileUserData ? (
        <Flex flexDirection="column" width="100%" height="100%">
          <Container height="100%" py={8}>
            <Flex display="flex" height="180px" mb={6} alignItems="center" width="100%">
              <Flex margin="0 auto" alignItems="center" maxWidth="900px" width="100%" height="100%">
                <Avatar size="xl" src={profileUserData?.profilePic} />
                <Stack ml={4} mt="auto" mb="auto">
                  <Text>
                    {profileUserData?.firstName}
                    {` ${profileUserData?.lastName}`}
                  </Text>
                  <Text mb={6} fontWeight="light" fontSize="sm">
                    {profileUserData?.description}
                  </Text>
                  {userData?.data?._id === profileUserData?._id && (
                    <Button onClick={onOpen} colorScheme="purple" maxWidth="100px" fontSize="sm" mt="20px!important">
                      Edit
                    </Button>
                  )}
                </Stack>
              </Flex>
            </Flex>

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
                return <Post userData={userData} profileUserData={profileUserData} postData={post} />;
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
              <css.EditPicAvatarContainer>
                <Avatar size="xl" src={profilePicPreview || profileUserData?.profilePic} mb={4} />
                <css.editPicSvgWrapper>
                  <AiOutlineCamera fill="white" />
                  <css.uploadInput {...register("profilePic", { required: false })} />
                </css.editPicSvgWrapper>
              </css.EditPicAvatarContainer>
              <Input fontSize="sm" mb={2} mr={1} placeholder="First Name" {...register("firstName", { required: true })} />
              <Input fontSize="sm" mb={2} placeholder="Last Name" {...register("lastName", { required: true })} />
              <Textarea resize="none" fontSize="sm" mb={2} placeholder="Description" {...register("description", { required: true })} />
            </ModalBody>

            <ModalFooter>
              <Button isLoading={isEditUserLoading} type="submit" fontSize="sm" colorScheme="purple">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
