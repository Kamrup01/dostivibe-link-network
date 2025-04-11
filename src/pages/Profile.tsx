
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/ProfileHeader';
import Post from '@/components/Post';
import { getUserById, getUserPosts } from '@/lib/data';
import { Post as PostType } from '@/lib/types';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setError('User not found');
      setLoading(false);
      return;
    }
    
    const user = getUserById(userId);
    if (!user) {
      setError('User not found');
      setLoading(false);
      return;
    }
    
    setUserPosts(getUserPosts(userId));
    setLoading(false);
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileHeader userId={userId!} />
      
      <div className="max-w-2xl mx-auto pt-6 px-4 pb-16">
        {userPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
        
        {userPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
