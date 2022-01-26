import { AxiosError } from "axios";
import api from "./apiConfig";

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

interface editUserPayload {
    firstName?: string;
    lastName?: string;
    description?: string;
}

//user
const signUp = (payload: signUpPayload) => {
    return api.post(`/user/signup`, payload).then((res) => res.data);
};

export const useSignUp = () => useMutation<any | undefined, AxiosError, any>(signUp);

const signIn = (payload: signInPayload): Promise<UserData | null> => {
    return api.post(`user/login`, payload).then((res) => {
        localStorage.setItem("userData", JSON.stringify(res?.data));
        return res?.data;
    });
};

export const useSignIn = () => useMutation(signIn);

const getUser = (id: string) => api.get(`/user/${id}`).then((res) => res.data);

export const useGetUser = (id: string) => useQuery("user", () => getUser(id));

const editUser = async ({ id, payload }: { id: string; payload: editUserPayload }) => {
    const res = await api.put(`/user/${id}`, payload);
    return res.data;
};

export const useEditUser = () => useMutation(editUser);

const signOut = async () => {
    const data = await api.post(`/user/signout`);
    return data;
};

export const useSignOut = () => useMutation(signOut);

// posts

const getUserPosts = (userId: string): Promise<Post[] | null> => {
    return api.get(`/post/userPosts/${userId}`).then((res) => res.data);
};

export const useGetUserPosts = (userId: string) => {
    return useQuery(["userPosts", userId], () => getUserPosts(userId));
};

const likePost = ({ postId, userId }: { postId: string; userId: string }) => {
    return api.post(`/post/${postId}/like`, { userId }).then((res) => res.data);
};

export const useLikePost = () => useMutation(likePost);
