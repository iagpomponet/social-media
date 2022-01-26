import { Post, UserData } from "../../types/api";
import { LoginState } from "../../types/auth";

export interface PostProps {
  postData: Post;
  userData: LoginState | null;
  profileUserData: UserData;
}
