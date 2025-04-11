
import { useState, useRef } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Camera, UserCircle } from 'lucide-react';
import { getUserById, updateUserProfile, updateUserProfilePicture } from '@/lib/data';
import { toast } from 'sonner';
import { fileToDataUrl, validateImageFile, compressImage } from '@/lib/fileUtils';

interface EditProfileDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProfileUpdated: () => void;
}

const EditProfileDialog = ({ userId, open, onOpenChange, onProfileUpdated }: EditProfileDialogProps) => {
  const user = getUserById(userId);
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  
  const handleProfilePictureClick = () => {
    profilePictureInputRef.current?.click();
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
      // Compress the image before converting to data URL for better performance
      const compressedBlob = await compressImage(file);
      const dataUrl = await fileToDataUrl(new File([compressedBlob], file.name, { type: file.type }));
      setProfilePicture(dataUrl);
    } catch (error) {
      toast.error("Failed to process image. Please try again.");
    }
  };
  
  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Update profile information
      const updated = updateUserProfile(userId, {
        displayName,
        username,
        bio
      });
      
      // Update profile picture if changed
      if (profilePicture !== user.profilePicture) {
        updateUserProfilePicture(userId, profilePicture);
      }
      
      if (updated) {
        toast.success("Profile updated successfully!");
        onProfileUpdated();
        onOpenChange(false);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <div 
              className="relative cursor-pointer group" 
              onClick={handleProfilePictureClick}
            >
              <Avatar className="w-24 h-24 border-2 border-gray-200">
                {profilePicture ? (
                  <AvatarImage src={profilePicture} alt={displayName} />
                ) : (
                  <AvatarFallback>
                    <UserCircle className="w-20 h-20" />
                  </AvatarFallback>
                )}
                <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Camera size={24} className="text-white" />
                </div>
              </Avatar>
            </div>
            <input 
              type="file"
              ref={profilePictureInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleProfilePictureClick}
              type="button"
            >
              Change Profile Picture
            </Button>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input 
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little bit about yourself"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !displayName.trim() || !username.trim()}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
