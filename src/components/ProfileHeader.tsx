
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUserById, toggleFollow, currentUserId, updateUserProfilePicture, updateUserCoverPhoto } from '@/lib/data';
import { User } from '@/lib/types';
import { Edit, Camera, UserCircle, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { fileToDataUrl, validateImageFile } from '@/lib/fileUtils';

interface ProfileHeaderProps {
  userId: string;
}

const ProfileHeader = ({ userId }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const profile = getUserById(userId);
  const currentUser = getUserById(currentUserId);
  
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.following.includes(userId) || false
  );
  
  // Refs for hidden file inputs
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const coverPhotoInputRef = useRef<HTMLInputElement>(null);
  
  const handleFollow = () => {
    if (!currentUser || userId === currentUserId) return;
    
    toggleFollow(currentUserId, userId);
    setIsFollowing(!isFollowing);
    
    toast(isFollowing ? `Unfollowed ${profile?.displayName}` : `Following ${profile?.displayName}`);
  };
  
  const handleEditProfile = () => {
    toast("Edit profile functionality coming soon!");
  };
  
  const handleViewFollowers = () => {
    toast(`${profile?.displayName} has ${profile?.followers.length} followers`);
  };
  
  const handleViewFollowing = () => {
    toast(`${profile?.displayName} is following ${profile?.following.length} users`);
  };
  
  const handleProfilePictureClick = () => {
    if (userId !== currentUserId) return;
    profilePictureInputRef.current?.click();
  };
  
  const handleCoverPhotoClick = () => {
    if (userId !== currentUserId) return;
    coverPhotoInputRef.current?.click();
  };
  
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    
    try {
      const dataUrl = await fileToDataUrl(file);
      updateUserProfilePicture(currentUserId, dataUrl);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile picture. Please try again.");
    }
  };
  
  const handleCoverPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateImageFile(file, 10);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    
    try {
      const dataUrl = await fileToDataUrl(file);
      updateUserCoverPhoto(currentUserId, dataUrl);
      toast.success("Cover photo updated successfully!");
    } catch (error) {
      toast.error("Failed to update cover photo. Please try again.");
    }
  };
  
  if (!profile) return <div>User not found</div>;
  
  const isCurrentUser = userId === currentUserId;
  
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Cover image */}
        <div 
          className="relative h-48 sm:h-64 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 mb-4 overflow-hidden group cursor-pointer"
          onClick={isCurrentUser ? handleCoverPhotoClick : undefined}
        >
          {profile.coverPhoto ? (
            <img 
              src={profile.coverPhoto} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={48} className="text-white/50" />
            </div>
          )}
          
          {isCurrentUser && (
            <>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCoverPhotoClick();
                }}
                className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Camera size={20} />
              </button>
              {/* Hidden file input for cover photo */}
              <input 
                type="file"
                ref={coverPhotoInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCoverPhotoChange}
              />
            </>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between relative">
          {/* Profile picture and info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end mb-4 sm:mb-0">
            <div className={`relative ${isCurrentUser ? 'cursor-pointer group/avatar' : ''}`} onClick={isCurrentUser ? handleProfilePictureClick : undefined}>
              <Avatar className="w-24 h-24 border-4 border-white -mt-12 sm:-mt-16 mb-3 sm:mb-0 sm:mr-4">
                {profile.profilePicture ? (
                  <AvatarImage src={profile.profilePicture} alt={profile.displayName} />
                ) : (
                  <AvatarFallback>
                    <UserCircle className="w-20 h-20" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              {isCurrentUser && (
                <>
                  <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                  {/* Hidden file input for profile picture */}
                  <input 
                    type="file"
                    ref={profilePictureInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </>
              )}
            </div>
            
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
              <Button 
                variant="outline" 
                onClick={handleEditProfile}
                className="flex gap-2 items-center"
              >
                <Edit size={16} />
                Edit Profile
              </Button>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="flex justify-center sm:justify-start space-x-6 mt-6">
          <button 
            onClick={handleViewFollowers}
            className="text-center hover:bg-gray-100 p-2 rounded-md transition-colors"
          >
            <p className="font-semibold">{profile.followers.length}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </button>
          <button 
            onClick={handleViewFollowing}
            className="text-center hover:bg-gray-100 p-2 rounded-md transition-colors"
          >
            <p className="font-semibold">{profile.following.length}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
