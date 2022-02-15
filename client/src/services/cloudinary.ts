import axios from "axios";
import { useMutation } from "react-query";
import { CloudinaryUploadResponse } from "../types/cloudinary";

const baseURL = "https://api.cloudinary.com/v1_1/dsusg7wdn";

const cloudinary = axios.create({
  baseURL,
});

const uploadImage = async (payload: FormData): Promise<CloudinaryUploadResponse> => {
  return cloudinary.post("/image/upload", payload);
};

export const useUploadImage = () => useMutation(uploadImage);
