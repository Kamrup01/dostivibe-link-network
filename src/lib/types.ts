
export interface User {
  id: string;
  username: string;
  displayName: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  followers: string[];
  following: string[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}
