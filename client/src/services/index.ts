import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { Post, UserData } from "../types/api";

interface signUpPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface signInPayload {
    email: string;
    password: string;
}

const baseURL = "http://localhost:8000";

export const api = axios.create({
    baseURL,
    withCredentials: true
});


const signUp = (payload: signUpPayload) => {
    return api.post(`/user/signup`, payload).then(res => res.data);
}

export const useSignUp = () => useMutation<any | undefined, AxiosError, any>(signUp);


const signIn = (payload: signInPayload): Promise<UserData | null> => {
    return api.post(`user/login`, payload).then(res => {
        console.log(`res`, res)
        localStorage.setItem('userData', JSON.stringify(res?.data));
        return res?.data
    })
}

export const useSignIn = () => useMutation(signIn);

const getUser = (id: string) => api.get(`/user/${id}`).then(res => res.data);

export const useGetUser = (id: string) => useQuery("user", () => getUser(id));

const getUserPosts = (userId: string): Promise<Post[] | null> => {
    return api.get(`/post/userPosts/${userId}`).then(res => res.data);
}

export const useGetUserPosts = (userId: string) => {
    return useQuery(['userPosts', userId], () => getUserPosts(userId));
}

const likePost = (postId: string) => {
    return api.post(`/${postId}/like`).then(res => res.data);
}

export const useLikePost = () => useMutation(likePost);