
import { useState, useEffect } from 'react';
import { posts, createPost } from '@/lib/data';
import Post from '@/components/Post';
import CreatePost from '@/components/CreatePost';
import Navbar from '@/components/Navbar';
import { Post as PostType } from '@/lib/types';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<PostType[]>([...posts]);
  
  const refreshPosts = () => {
    setFeedPosts([...posts]);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-6 px-4 pb-16">
        <CreatePost onPostCreated={refreshPosts} />
        
        {feedPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
        
        {feedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
