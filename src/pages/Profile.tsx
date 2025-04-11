
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/ProfileHeader';
import Post from '@/components/Post';
import { getUserById, getUserPosts, users } from '@/lib/data';
import { Post as PostType, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
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
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse">Loading profile...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileHeader userId={userId!} />
      
      <div className="max-w-2xl mx-auto pt-6 px-4 pb-16">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2"
          onClick={handleGoBack}
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        
        <div className="space-y-6">
          {userPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
          
          {userPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow p-8">
              <p className="text-lg text-gray-500">No posts yet</p>
              <p className="text-gray-400 mt-2">
                This user hasn't posted anything yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
