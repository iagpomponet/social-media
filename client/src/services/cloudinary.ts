import axios from "axios";
import { useMutation } from "react-query";

const baseURL = "https://api.cloudinary.com/v1_1/dsusg7wdn";

const cloudinary = axios.create({
  baseURL,
});

interface CloudinaryUploadResponse {
  data: {
    asset_id: string;
    public_id: string;
    version: Number;
    version_id: string;
    signature: string;
    width: Number;
    height: Number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: Number;
    type: string;
    etag: string;
    placeholder: false;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
  };
}

const uploadImage = async (payload: FormData): Promise<CloudinaryUploadResponse> => {
  return cloudinary.post("/image/upload", payload);
};

export const useUploadImage = () => useMutation(uploadImage);
