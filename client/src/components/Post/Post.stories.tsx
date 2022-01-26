import { ChakraProvider, GlobalStyle } from "@chakra-ui/react";
import { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockedPostData, mockedUserData } from "../../utils/testUtils";

import Post from "./index";

const queryClient = new QueryClient();

export default {
  title: "Post",
  component: Post,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </ChakraProvider>
    ),
  ],
} as Meta;

export const Default = () => {
  return (
    <>
      <Post
        profileUserData={mockedUserData}
        userData={{
          isLogged: true,
          data: mockedUserData,
        }}
        postData={mockedPostData}
      />
    </>
  );
};
