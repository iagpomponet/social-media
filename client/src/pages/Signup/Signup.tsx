import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button, Flex, Alert, AlertIcon, AlertTitle, CloseButton, Text } from "@chakra-ui/react";

import * as css from "./Signup.styles";
import { SignupForm } from "./Signup.types";
import { useSignUp } from "../../services";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";

export default function Signup() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const { setUserData } = useAuth();

  const navigate = useNavigate();

  const { data, mutateAsync, error, isLoading } = useSignUp();

  const onSubmit = async (data: SignupForm) => {
    const { password, confirmPassword, email, firstName, lastName } = data;

    if (password !== confirmPassword) {
      return setError("password", {
        type: "password",
        message: "Passwords don't match",
      });
    }

    const payload = {
      email,
      password,
      firstName,
      lastName,
    };

    const response = await mutateAsync(payload);

    return setUserData({
      isLogged: true, 
      data: response
    })
  };

  useEffect(() => {
    if (data) {
      navigate(`/profile/${data?.data?._id}`);
    }
  }, [data, navigate]);

  return (
    <Flex
      height="350px"
      width="100%"
      maxWidth="360px"
      flexDirection="column"
      p={4}
      justifyContent="center"
      alignItems="center"
    >
      <css.Form onSubmit={handleSubmit(onSubmit)}>
        <Text mb={4} fontWeight="semibold" color="purple" fontSize="2xl" marginRight="auto">
          Sign up
        </Text>
        <Flex>
          <Input fontSize="sm" isInvalid={errors.firstName} mb={2} mr={1} placeholder="First Name" {...register("firstName", { required: true })} />
          <Input fontSize="sm" isInvalid={errors.lastName} mb={2} placeholder="Last Name" {...register("lastName", { required: true })} />
        </Flex>
        <Input  fontSize="sm" isInvalid={errors.email} mb={2} placeholder="Email" {...register("email", { required: true })} />
        <Input  fontSize="sm" type="password" isInvalid={errors.password} mb={2} placeholder="Password" {...register("password", { required: true })} />
        <Input
        fontSize="sm"
          type="password"
          placeholder="Confirm Password"
          isInvalid={errors.confirmPassword}
          mb={2}
          {...register("confirmPassword", { required: true })}
        />
        {errors?.password?.type === "password" ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Password don't match! </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ) : null}

        {error?.response?.data?.error_message ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{error?.response?.data?.error_message} </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ) : null}
        <Button fontSize="sm" isLoading={isLoading} mt={4} type="submit" colorScheme="purple" variant="solid">
          Submit
        </Button>
      </css.Form>
    </Flex>
  );
}
