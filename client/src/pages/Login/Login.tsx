import { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/modal";
import { MdOutlineClose } from "react-icons/md";

import * as css from "./Login.styles";
import Signup from "../Signup";
import { useForm } from "react-hook-form";
import { useSignIn } from "../../services/api";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth";
import { LoginProps } from "./Login.types";

export default function Login({ signUpOpen = false }: LoginProps) {
  const { register, handleSubmit } = useForm();
  const { mutateAsync, isLoading, error, data } = useSignIn();
  const navigate = useNavigate();

  const { setUserData, userData } = useAuth();

  const tError = error as AxiosError;

  const onSubmit = async (data: any) => {
    const response = await mutateAsync(data);

    setUserData({
      isLogged: true,
      data: response,
    });
  };

  useEffect(() => {
    debugger;
    if (userData?.isLogged) {
      navigate(`/profile/${userData.data?._id}`);
    }
  }, [data, navigate]);

  useEffect(() => {
    if (signUpOpen) {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      <Flex background="#f0f2f5" height="100%" px={4} justifyContent="center" alignItems="center">
        <Flex flexWrap={["wrap", "wrap", "wrap", "nowrap"]} width="100%" maxWidth="1200px" margin="0 auto" justifyContent="center">
          <Flex background="white" px={4} py={4} height="300px" width="100%" maxWidth="300px" borderRadius="10px" flexDirection="column">
            <css.Form onSubmit={handleSubmit(onSubmit)}>
              <Input {...register("email", { required: true })} fontSize="sm" mb={2} placeholder="Email" type="text" />
              <Input {...register("password", { required: true })} fontSize="sm" mb={2} placeholder="Password" type="password" />

              {tError?.response?.data?.error_message ? (
                <Alert mb={2} status="error">
                  <AlertIcon />
                  <AlertTitle fontSize="sm" mr={2}>
                    {tError?.response?.data?.error_message}{" "}
                  </AlertTitle>
                </Alert>
              ) : null}

              <Button type="submit" isLoading={isLoading} colorScheme="purple" variant="outline" fontSize="sm" width="100%" mb={4}>
                Enter
              </Button>
            </css.Form>
            <Button
              fontSize="sm"
              colorScheme="purple"
              mt="auto"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create new account
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isOpen={signUpOpen}
        onClose={() => {
          navigate("/login");
        }}
      >
        <ModalOverlay />
        <ModalContent mx={4} position="relative" maxWidth="400px" display="flex" alignItems="center" backgroundColor="rgba(255,255,255,1)">
          <Box cursor="pointer" position="absolute" top="16px" right="16px">
            <MdOutlineClose
              size={20}
              fill="#553C9A"
              onClick={() => {
                navigate("/login");
              }}
            />
          </Box>
          <Signup />
        </ModalContent>
      </Modal>
    </>
  );
}
