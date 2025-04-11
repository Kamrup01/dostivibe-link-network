
import { Link } from 'react-router-dom';
import { Home, User, Search, Bell, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserById, currentUserId } from '@/lib/data';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SearchDialog from './SearchDialog';

const Navbar = () => {
  const currentUser = getUserById(currentUserId);
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">PL</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
            PulseLink
          </span>
        </Link>
        
        {/* Navigation */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            <Home className="w-6 h-6" />
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-gray-700 hover:text-primary transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </DialogTrigger>
            <SearchDialog />
          </Dialog>
          <Link to="#" className="text-gray-700 hover:text-primary transition-colors">
            <Bell className="w-6 h-6" />
          </Link>
          <Link to={`/profile/${currentUserId}`} className="text-gray-700 hover:text-primary transition-colors">
            <Avatar className="w-6 h-6">
              <AvatarImage src={currentUser?.profilePicture} alt={currentUser?.username} />
              <AvatarFallback>{currentUser?.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
