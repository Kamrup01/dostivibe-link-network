
export interface User {
  id: string;
  username: string;
  displayName: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  email: string;
  location: string;
  website: string;
  followers: string[];
  following: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  music?: Song;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}
