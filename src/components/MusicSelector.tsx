
import { useState, useEffect } from 'react';
import { Music, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

// Mock songs data (in a real app, this would come from an API)
const mockSongs: Song[] = [
  { id: '1', title: 'Shape of You', artist: 'Ed Sheeran', url: 'https://example.com/shape-of-you.mp3' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', url: 'https://example.com/blinding-lights.mp3' },
  { id: '3', title: 'Dance Monkey', artist: 'Tones and I', url: 'https://example.com/dance-monkey.mp3' },
  { id: '4', title: 'Someone You Loved', artist: 'Lewis Capaldi', url: 'https://example.com/someone-you-loved.mp3' },
  { id: '5', title: 'Bad Guy', artist: 'Billie Eilish', url: 'https://example.com/bad-guy.mp3' },
  { id: '6', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', url: 'https://example.com/stay.mp3' },
  { id: '7', title: 'Levitating', artist: 'Dua Lipa', url: 'https://example.com/levitating.mp3' },
  { id: '8', title: 'Montero', artist: 'Lil Nas X', url: 'https://example.com/montero.mp3' },
  { id: '9', title: 'Watermelon Sugar', artist: 'Harry Styles', url: 'https://example.com/watermelon-sugar.mp3' },
  { id: '10', title: 'Peaches', artist: 'Justin Bieber', url: 'https://example.com/peaches.mp3' }
];

interface MusicSelectorProps {
  onSelectSong: (song: Song | null) => void;
  selectedSong: Song | null;
}

const MusicSelector = ({ onSelectSong, selectedSong }: MusicSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(mockSongs);
  
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = mockSongs.filter(
        song => song.title.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(mockSongs);
    }
  }, [searchTerm]);
  
  const handleSelectSong = (song: Song) => {
    onSelectSong(song);
  };
  
  const handleRemoveSong = () => {
    onSelectSong(null);
  };
  
  return (
    <>
      {selectedSong ? (
        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
          <Music className="text-primary h-4 w-4" />
          <div className="flex-1 text-sm">
            <p className="font-medium">{selectedSong.title}</p>
            <p className="text-xs text-gray-500">{selectedSong.artist}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemoveSong} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Music className="h-4 w-4" />
              Add Music
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Music</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Search songs or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <div className="max-h-80 overflow-y-auto space-y-2">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                    onClick={() => handleSelectSong(song)}
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <Music className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-gray-500">{song.artist}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">
                  No songs found matching your search
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MusicSelector;
