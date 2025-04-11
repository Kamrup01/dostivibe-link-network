
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Send, MoreHorizontal, Music, Play, Pause } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getUserById, toggleLike, addComment, currentUserId } from '@/lib/data';
import { Post as PostType } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([...post.comments]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  const user = getUserById(post.userId);
  
  const handleLike = () => {
    toggleLike(post.id, currentUserId);
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  
  const handleComment = () => {
    if (!newComment.trim()) return;
    
    addComment(post.id, currentUserId, newComment);
    setComments([...post.comments]);
    setNewComment('');
  };
  
  const togglePlayMusic = () => {
    if (!post.music) return;
    
    if (!audioElement) {
      const audio = new Audio(post.music.url);
      setAudioElement(audio);
      audio.play().catch(error => console.error("Error playing audio:", error));
      setIsPlaying(true);
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    } else {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch(error => console.error("Error playing audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${user.id}`} className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt={user.username} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.displayName}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </Link>
        <button className="text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="mb-2">{post.content}</p>
      </div>
      
      {/* Music Attachment */}
      {post.music && (
        <div className="mx-4 mb-3 p-3 bg-gray-50 rounded-lg flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-primary text-white hover:bg-primary/90 mr-3"
            onClick={togglePlayMusic}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <div className="flex-1">
            <div className="flex items-center">
              <Music size={16} className="text-primary mr-2" />
              <p className="font-medium">{post.music.title}</p>
            </div>
            <p className="text-xs text-gray-500">{post.music.artist}</p>
          </div>
        </div>
      )}
      
      {/* Post Image */}
      {post.image && (
        <div className="relative">
          <img 
            src={post.image} 
            alt="Post" 
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}
      
      {/* Post Footer */}
      <div className="px-4 py-2">
        {/* Time */}
        <div className="text-xs text-gray-500 mb-2">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </div>
        
        {/* Stats */}
        <div className="flex items-center space-x-4 mb-2 text-sm text-gray-500">
          <span>{likeCount} likes</span>
          <button onClick={() => setShowComments(!showComments)}>
            {comments.length} comments
          </button>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button 
            className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors"
            onClick={handleLike}
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500 animate-heart' : 'fill-transparent'}`} 
            />
            <span>Like</span>
          </button>
          
          <button 
            className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
            <Send className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          {/* Comment List */}
          {comments.map(comment => {
            const commentUser = getUserById(comment.userId);
            if (!commentUser) return null;
            
            return (
              <div key={comment.id} className="flex space-x-2 mb-3">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={commentUser.profilePicture} />
                  <AvatarFallback>{commentUser.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-3 py-2">
                    <Link to={`/profile/${commentUser.id}`} className="font-medium text-sm">
                      {commentUser.displayName}
                    </Link>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Add Comment */}
          <div className="flex space-x-2 mt-3">
            <Avatar className="w-7 h-7">
              <AvatarImage 
                src={getUserById(currentUserId)?.profilePicture} 
                alt={getUserById(currentUserId)?.username} 
              />
              <AvatarFallback>
                {getUserById(currentUserId)?.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 min-h-[32px] h-8 text-sm py-1 resize-none"
              />
              <Button 
                size="sm"
                variant="ghost" 
                className="ml-2" 
                onClick={handleComment}
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
