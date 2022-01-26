import axios from "axios";
import { useMutation } from "react-query";

const baseURL = "https://api.cloudinary.com/v1_1/";

const cloudinary = axios.create({
  baseURL,
});

const uploadImage = async (payload: FormData) => {
  return cloudinary.post("/demo/image/upload", payload);
};

export const useUploadImage = () => useMutation(uploadImage);
