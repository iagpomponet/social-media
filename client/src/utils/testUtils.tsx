import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const mockedUserData = {
  _id: "61b2817361a273ac48f8b1b9",
  profilePic: "https://res.cloudinary.com/dbukg7rbr/image/upload/v1634170489/a_j14mm4.jpg",
  firstName: "Iago",
  lastName: "Pomponet",
  email: "email@email.com",
  password: "$2b$10$AxZgyAxBsls6MkosVO1R5.eEX88tf.SPffRJGN3nvcO9vwjNt3jcK",
  description: "Pica, ta?",
};

export const mockedPostData = {
  _id: "61bce1fed4507655f25ef9d7",
  updatedAt: "2021-12-17T19:16:14.527Z",
  owner: "61b2817361a273ac48f8b1b9",
  content: "Text content of a post",
  likes: ["61b1150f61a273ac48f8b1a3", "61b2817361a273ac48f8b1b9"],
  comments: [],
  createdAt: "2021-12-17T19:16:14.527Z",
  __v: 0,
};

export const renderThemed = (component: ReactNode) => {
  const queryClient = new QueryClient();

  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
    </ChakraProvider>
  );
};
