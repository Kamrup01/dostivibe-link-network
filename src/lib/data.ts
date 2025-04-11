import { User, Post } from './types';

export const users: User[] = [
  {
    id: 'user1',
    username: 'johndoe',
    displayName: 'John Doe',
    profilePicture: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    bio: 'Photographer and travel enthusiast',
    followers: ['user2', 'user3', 'user4', 'user5'],
    following: ['user2', 'user3'],
  },
  {
    id: 'user2',
    username: 'janesmith',
    displayName: 'Jane Smith',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    bio: 'Digital artist and coffee lover',
    followers: ['user1', 'user3', 'user4'],
    following: ['user1', 'user3', 'user5'],
  },
  {
    id: 'user3',
    username: 'mikebrown',
    displayName: 'Mike Brown',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    bio: 'Software developer and gamer',
    followers: ['user2', 'user4'],
    following: ['user1', 'user2'],
  },
  {
    id: 'user4',
    username: 'sarahlee',
    displayName: 'Sarah Lee',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    bio: 'Fashion designer and traveler',
    followers: ['user1', 'user5'],
    following: ['user1', 'user2'],
  },
  {
    id: 'user5',
    username: 'alexchen',
    displayName: 'Alex Chen',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1581092918056-0c4c1e9f547b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    bio: 'Music producer and guitarist',
    followers: ['user2'],
    following: ['user4'],
  },
];

export const posts: Post[] = [
  {
    id: 'post1',
    userId: 'user1',
    content: 'Just captured this amazing sunset on my evening walk! #photography #sunset',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80',
    likes: ['user2', 'user3'],
    comments: [
      {
        id: 'comment1',
        userId: 'user2',
        content: 'This is absolutely stunning! Where was this taken?',
        createdAt: '2023-05-01T14:30:00Z',
      }
    ],
    createdAt: '2023-05-01T12:00:00Z',
  },
  {
    id: 'post2',
    userId: 'user2',
    content: 'Finished my latest digital artwork today! It took me 3 days. What do you think? #digitalart #creation',
    image: 'https://images.unsplash.com/photo-1620912189867-894afd7389c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    likes: ['user1'],
    comments: [],
    createdAt: '2023-04-29T09:15:00Z',
  },
  {
    id: 'post3',
    userId: 'user3',
    content: 'Just launched my new web app after months of hard work! Check it out in the link in bio. #webdev #coding',
    likes: ['user1', 'user2'],
    comments: [
      {
        id: 'comment2',
        userId: 'user1',
        content: 'Congratulations! The app looks amazing.',
        createdAt: '2023-04-28T18:45:00Z',
      },
      {
        id: 'comment3',
        userId: 'user2',
        content: 'Great work! I\'ll be checking it out.',
        createdAt: '2023-04-28T19:10:00Z',
      }
    ],
    createdAt: '2023-04-28T16:30:00Z',
  },
];

export const currentUserId = 'user1';

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const getUserPosts = (userId: string): Post[] => {
  return posts.filter(post => post.userId === userId);
};

export const toggleLike = (postId: string, userId: string): void => {
  const post = getPostById(postId);
  if (!post) return;
  
  const likeIndex = post.likes.indexOf(userId);
  if (likeIndex > -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    post.likes.push(userId);
  }
};

export const addComment = (postId: string, userId: string, content: string): void => {
  const post = getPostById(postId);
  if (!post) return;
  
  const newComment = {
    id: `comment${Date.now()}`,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };
  
  post.comments.push(newComment);
};

export const toggleFollow = (followerId: string, followingId: string): void => {
  const follower = getUserById(followerId);
  const following = getUserById(followingId);
  
  if (!follower || !following) return;
  
  const isFollowing = follower.following.includes(followingId);
  
  if (isFollowing) {
    follower.following = follower.following.filter(id => id !== followingId);
    following.followers = following.followers.filter(id => id !== followerId);
  } else {
    follower.following.push(followingId);
    following.followers.push(followerId);
  }
};

export const createPost = (userId: string, content: string, image?: string): Post => {
  const newPost = {
    id: `post${Date.now()}`,
    userId,
    content,
    image,
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };
  
  posts.unshift(newPost);
  return newPost;
};
