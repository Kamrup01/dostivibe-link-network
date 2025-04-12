
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { users } from '@/lib/data';
import { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchDialogProps {
  onClose?: () => void;
}

const SearchDialog = ({ onClose }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(user => 
        user.displayName.toLowerCase().includes(term) || 
        user.username.toLowerCase().includes(term)
      );
      setSearchResults([...filtered]); // Create a new array to avoid type conflicts
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  
  const handleUserSelect = (userId: string) => {
    navigate(`/profile/${userId}`);
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Search Users</DialogTitle>
      </DialogHeader>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search by name or username..."
          className="pl-10 pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setSearchTerm('')}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      
      <div className="max-h-72 overflow-y-auto">
        {searchResults.length > 0 ? (
          <div className="space-y-2">
            {searchResults.map(user => (
              <div 
                key={user.id}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserSelect(user.id)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="py-6 text-center text-gray-500">
            <p>No users found</p>
          </div>
        ) : null}
      </div>
    </DialogContent>
  );
};

export default SearchDialog;
