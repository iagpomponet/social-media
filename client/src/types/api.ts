export interface UserData {
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePic: string;
  _id: string;
}

export interface Post {
  comments: any[];
  content: string;
  createdAt: string;
  likes: any[];
  owner: string;
  updatedAt: string;
  _id: string;
}
