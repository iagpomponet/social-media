import { mockedPostData, mockedUserData, renderThemed } from "../../utils/testUtils";
import { screen } from "@testing-library/react";
import Post from "./Post";

const renderComponent = () => {
  return renderThemed(
    <Post
      userData={{
        isLogged: true,
        data: mockedUserData,
      }}
      profileUserData={mockedUserData}
      postData={mockedPostData}
    />
  );
};

describe("Post component tests", () => {
  it("should render successfully", () => {
    const Component = renderComponent();
    expect(Component).toBeDefined();
  });

  it("should should show the right text", () => {
    renderComponent();
    const postTextElement = screen.getByText(mockedPostData?.content);
    expect(postTextElement).toBeDefined();
  });
});
