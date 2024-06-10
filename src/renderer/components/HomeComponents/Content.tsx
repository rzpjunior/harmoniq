import React, { useState, useEffect } from 'react';
import { searchTracks } from '../../../services/itunesService';

interface ContentProps {
  onTrackSelect: (track: any) => void;
  currentPlayingTrackId: string | null; // Prop to receive the currently playing track ID
}

const Content: React.FC<ContentProps> = ({ onTrackSelect, currentPlayingTrackId }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const result = await searchTracks(query);
      setTracks(result);
    };

    fetchTracks();
  }, [query]);

  const formatDuration = (millis: number) => {
    if (!millis) return 'N/A';
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
            <div className="flex-grow">
              <h3 className="text-lg">{track.trackName}</h3>
              <p className="text-sm text-gray-600">{track.artistName}</p>
            </div>
            <button className="p-1 mr-2 text-red-500">
              <i className="fas fa-heart"></i>
            </button>
            <button
              style={{ background: '#410041' }}
              onClick={() => onTrackSelect(track)}
              className="p-2 bg-blue-500 text-white mr-2"
            >
              {currentPlayingTrackId === track.trackId ? 'Pause' : 'Play'}
            </button>
            <button className="p-1 text-gray-700">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;