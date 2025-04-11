import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  followers: string[];
  following: string[];
  createdAt: string;
  profilePicture: string;
  coverPhoto?: string;
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
  music?: { id: string; title: string; artist: string; url: string };
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

// Generate User data
export const users: User[] = Array.from({ length: 10 }, (_, i) => {
  const userId = `user-${i + 1}`;
  const username = faker.internet.userName();
  const displayName = faker.person.fullName();
  const profilePicture = faker.image.avatar();
  const coverPhoto = faker.image.urlLoremFlickr({ category: 'nature' });
  
  return {
    id: userId,
    username: username,
    displayName: displayName,
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    location: faker.location.city(),
    website: faker.internet.url(),
    followers: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }, () => `user-${faker.number.int({ min: 1, max: 10 })}`),
    following: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }, () => `user-${faker.number.int({ min: 1, max: 10 })}`),
    createdAt: faker.date.past().toISOString(),
    profilePicture: profilePicture,
    coverPhoto: coverPhoto,
  };
});

// Generate Post data
export const posts: Post[] = Array.from({ length: 20 }, (_, i) => {
  const userId = `user-${faker.number.int({ min: 1, max: 10 })}`;
  const image = faker.image.urlLoremFlickr({ category: 'nature' });
  
  return {
    id: `post-${i + 1}`,
    userId: userId,
    content: faker.lorem.paragraph(),
    image: image,
    likes: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => `user-${faker.number.int({ min: 1, max: 10 })}`),
    comments: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      id: `comment-${Date.now()}`,
      userId: `user-${faker.number.int({ min: 1, max: 10 })}`,
      content: faker.lorem.sentence(),
      createdAt: faker.date.recent().toISOString(),
    })),
    createdAt: faker.date.recent().toISOString(),
  };
});

// Current User ID
export const currentUserId = 'user-1';

// Function to get a user by ID
export const getUserById = (id: string) => {
  return users.find(user => user.id === id);
};

// Function to get posts by user ID
export const getUserPosts = (userId: string) => {
  return posts.filter(post => post.userId === userId);
};

// Function to toggle like on a post
export const toggleLike = (postId: string, userId: string) => {
  const post = posts.find(post => post.id === postId);
  if (post) {
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      post.likes.push(userId);
    }
  }
};

// Function to add a comment to a post
export const addComment = (postId: string, userId: string, content: string) => {
  const post = posts.find(post => post.id === postId);
  if (post) {
    const newComment = {
      id: `comment-${Date.now()}`,
      userId,
      content,
      createdAt: new Date().toISOString(),
    };
    post.comments.push(newComment);
  }
};

export const createPost = (
  userId: string,
  content: string,
  image?: string,
  music?: { id: string; title: string; artist: string; url: string }
) => {
  const newPost = {
    id: `post-${Date.now()}`,
    userId,
    content,
    image,
    music,
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };
  
  posts.unshift(newPost);
  return newPost;
};
