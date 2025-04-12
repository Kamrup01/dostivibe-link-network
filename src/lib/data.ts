
import { faker } from '@faker-js/faker';
import { User, Post, Comment, Song } from './types';

// Generate User data
export const users: User[] = Array.from({ length: 10 }, (_, i) => {
  const userId = `user-${i + 1}`;
  const username = faker.internet.username();
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

// Sample songs for music posts
export const sampleSongs: Song[] = [
  { id: '1', title: 'Shape of You', artist: 'Ed Sheeran', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'Dance Monkey', artist: 'Tones and I', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', title: 'Someone You Loved', artist: 'Lewis Capaldi', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '5', title: 'Bad Guy', artist: 'Billie Eilish', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

// Generate Post data
export const posts: Post[] = Array.from({ length: 20 }, (_, i) => {
  const userId = `user-${faker.number.int({ min: 1, max: 10 })}`;
  const image = faker.image.urlLoremFlickr({ category: 'nature' });
  // Add music to some posts
  const includeMusic = faker.datatype.boolean(0.3); // 30% chance of having music
  const music = includeMusic ? sampleSongs[faker.number.int({ min: 0, max: sampleSongs.length - 1 })] : undefined;
  
  return {
    id: `post-${i + 1}`,
    userId: userId,
    content: faker.lorem.paragraph(),
    image: faker.datatype.boolean(0.7) ? image : undefined, // 70% chance of having image
    music,
    likes: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => `user-${faker.number.int({ min: 1, max: 10 })}`),
    comments: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      id: `comment-${faker.number.int(100000)}`,
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

// Function to toggle follow status
export const toggleFollow = (currentUserId: string, targetUserId: string) => {
  const currentUser = getUserById(currentUserId);
  const targetUser = getUserById(targetUserId);
  
  if (!currentUser || !targetUser) return false;
  
  if (currentUser.following.includes(targetUserId)) {
    currentUser.following = currentUser.following.filter(id => id !== targetUserId);
    targetUser.followers = targetUser.followers.filter(id => id !== currentUserId);
  } else {
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);
  }
  
  return true;
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

// Function to update user profile
export const updateUserProfile = (userId: string, data: { displayName: string; username: string; bio: string }) => {
  const user = users.find(user => user.id === userId);
  
  if (!user) return false;
  
  user.displayName = data.displayName;
  user.username = data.username;
  user.bio = data.bio;
  
  return true;
};

// Function to update user profile picture
export const updateUserProfilePicture = (userId: string, imageUrl: string) => {
  const user = users.find(user => user.id === userId);
  
  if (!user) return false;
  
  user.profilePicture = imageUrl;
  
  return true;
};

// Function to update user cover photo
export const updateUserCoverPhoto = (userId: string, imageUrl: string) => {
  const user = users.find(user => user.id === userId);
  
  if (!user) return false;
  
  user.coverPhoto = imageUrl;
  
  return true;
};

export const createPost = (
  userId: string,
  content: string,
  image?: string,
  music?: Song
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

