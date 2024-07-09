import React, { useState, useEffect } from 'react';
import { searchTracks } from '../../../services/itunesService';

interface ContentProps {
  onTrackSelect: (track: any) => void;
  currentPlayingTrackId: string | null;
  togglePlayPause: () => void;
  isPlaying: boolean;
}

const Search: React.FC<ContentProps> = ({ onTrackSelect, currentPlayingTrackId, togglePlayPause, isPlaying }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const result = await searchTracks(query);
      setTracks(result);
    };

    fetchTracks();
  }, [query]);

  // Helper function to convert milliseconds to minutes and seconds
  const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  };

  const truncateTitle = (title: string) => {
    console.log(title);
    const wordLimit = 6;
    const words = title.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return title;
  };

  return (
    <div className="flex-1 p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for tracks"
        className="w-full mb-4 p-2 border border-gray-300 bg-transparent"
      />
      <div className="w-full bg-transparent">
        {tracks.map((track) => (
          <div key={track.trackId} className="flex items-center mb-4 bg-black bg-opacity-50 p-2">
            <img src={track.artworkUrl60} alt={track.trackName} className="w-12 h-12 mr-4" />
            <div className="flex-grow flex flex-col justify-center">
            <h3 className="text-lg overflow-hidden whitespace-nowrap">{track.trackName}</h3>
              <p className="text-sm text-gray-600">{track.artistName}</p>
            </div>
            <div className="w-20 text-center">
              <p className="text-sm">{formatDuration(track.trackTimeMillis)}</p>
            </div>
            <div className="flex items-center ml-4">
              <button
                onClick={() => {
                  if (currentPlayingTrackId === track.trackId) {
                    togglePlayPause();
                  } else {
                    onTrackSelect(track);
                  }
                }}
                className="p-2 bg-blue-500 text-white"
              >
                {currentPlayingTrackId === track.trackId && isPlaying ? 
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  : 
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                }
              </button>
              <button className="p-1 text-gray-700 ml-2">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;