import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

interface signUpPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const baseURL = "http://localhost:3000";

export const signUp = (payload: signUpPayload) => {
    return axios.post(`${baseURL}/user/signup`, payload).then(res => res.data);
}

export const useSignUp = () => useMutation<any | undefined, AxiosError, any>(signUp);