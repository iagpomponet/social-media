import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button, Flex, Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";


import * as css from "./Signup.styles";
import { SignupForm } from "./Signup.types";
import { useSignUp } from "../../services";
import { useEffect } from "react";

export default function Signup() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { data, mutate, error, isError, isLoading } = useSignUp();

  const onSubmit = async (data: SignupForm) => {
    const { password, confirmPassword, email, firstName, lastName } = data;
    console.log(data);
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
        lastName
    };

     return mutate(payload);
  };

  console.log('error :>> ', error);
  console.log("errors :>> ", errors);
  console.log(`isError`, isError);

  console.log(`error.`, error?.response?.data?.error_message);
  console.log(`data`, data);

  useEffect(() => {
    if(data){
      navigate(`/profile/${data?.data?._id}`)
    }
  },[data, navigate]);

  return (
    <Flex height="100%" p={2} justifyContent="center" alignItems="center">
      <css.Form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <Input
            isInvalid={errors.firstName}
            mb={2}
            mr={1}
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          <Input
            isInvalid={errors.lastName}
            mb={2}
            placeholder="Last Name"
            {...register("lastName", { required: true })}
          />
        </Flex>
        <Input
          isInvalid={errors.email}
          mb={2}
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Input
          type="password"
          isInvalid={errors.password}
          mb={2}
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <Input
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
        <Button isLoading={isLoading} mt={4}  type="submit" colorScheme='teal' variant="solid">
          Button
        </Button>
      </css.Form>
    </Flex>
  );
}