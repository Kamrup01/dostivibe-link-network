
import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, X } from 'lucide-react';
import { createPost, getUserById, currentUserId } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { fileToDataUrl, validateImageFile } from '@/lib/fileUtils';

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentUser = getUserById(currentUserId);
  
  const handleSubmit = () => {
    if (!content.trim() && !image) return;
    
    setIsSubmitting(true);
    
    // Create new post
    createPost(currentUserId, content, image);
    
    // Reset form
    setContent('');
    setImage(undefined);
    setIsSubmitting(false);
    
    // Show success toast
    toast({
      title: "Post created!",
      description: "Your post has been successfully shared.",
    });
    
    // Call callback if provided
    if (onPostCreated) {
      onPostCreated();
    }
  };
  
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({
        title: "Error",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    
    try {
      const dataUrl = await fileToDataUrl(file);
      setImage(dataUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
          <AvatarFallback>{currentUser.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={`What's on your mind, ${currentUser.displayName.split(' ')[0]}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none min-h-[100px] border-gray-300 focus:border-primary"
          />
          
          {/* Image Preview */}
          {image && (
            <div className="relative mt-3 rounded-lg overflow-hidden">
              <img src={image} alt="Post" className="w-full h-auto max-h-[300px] object-cover" />
              <button 
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                onClick={() => setImage(undefined)}
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="text-gray-600"
              onClick={handleImageUploadClick}
            >
              <ImageIcon size={18} className="mr-1" />
              Photo
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            
            <Button 
              onClick={handleSubmit} 
              disabled={(!content.trim() && !image) || isSubmitting}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
