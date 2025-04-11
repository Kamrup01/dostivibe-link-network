
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUserById, toggleFollow, currentUserId } from '@/lib/data';
import { User } from '@/lib/types';
import { useState } from 'react';

interface ProfileHeaderProps {
  userId: string;
}

const ProfileHeader = ({ userId }: ProfileHeaderProps) => {
  const profile = getUserById(userId);
  const currentUser = getUserById(currentUserId);
  
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.following.includes(userId) || false
  );
  
  const handleFollow = () => {
    if (!currentUser || userId === currentUserId) return;
    
    toggleFollow(currentUserId, userId);
    setIsFollowing(!isFollowing);
  };
  
  if (!profile) return <div>User not found</div>;
  
  const isCurrentUser = userId === currentUserId;
  
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Cover image */}
        <div className="h-32 sm:h-48 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 mb-4" />
        
        <div className="flex flex-col sm:flex-row justify-between relative">
          {/* Profile picture and info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end mb-4 sm:mb-0">
            <Avatar className="w-24 h-24 border-4 border-white -mt-12 sm:-mt-16 mb-3 sm:mb-0 sm:mr-4">
              <AvatarImage src={profile.profilePicture} alt={profile.displayName} />
              <AvatarFallback>{profile.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold">{profile.displayName}</h1>
              <p className="text-gray-500 text-sm">@{profile.username}</p>
              <p className="mt-2">{profile.bio}</p>
            </div>
          </div>
          
          {/* Follow button */}
          {!isCurrentUser ? (
            <div className="sm:self-end">
              <Button 
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className={isFollowing ? "hover:text-red-500 hover:border-red-500" : ""}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          ) : (
            <div className="sm:self-end">
              <Button variant="outline">Edit Profile</Button>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="flex justify-center sm:justify-start space-x-6 mt-6">
          <div className="text-center">
            <p className="font-semibold">{profile.followers.length}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{profile.following.length}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
