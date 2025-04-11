
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, X } from 'lucide-react';
import { createPost, getUserById, currentUserId } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  // Mock image upload
  const handleImageUpload = () => {
    // This would normally be a file upload
    const mockImages = [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1682685797507-d44d838b0570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ];
    
    setImage(mockImages[Math.floor(Math.random() * mockImages.length)]);
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
              onClick={handleImageUpload}
            >
              <Image size={18} className="mr-1" />
              Photo
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
