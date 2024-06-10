import React, { useState, useEffect } from 'react';
import { searchTracks } from '../../../services/itunesService';

interface ContentProps {
  onTrackSelect: (track: any) => void;
}

const Content: React.FC<ContentProps> = ({ onTrackSelect }) => {
  const [query, setQuery] = useState('Eminem');
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const result = await searchTracks(query);
      setTracks(result);
    };

    fetchTracks();
  }, [query]);

  return (
    <div className="flex-1 p-4">
      <h2 className="text-black">Tracks</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for tracks"
        className="mb-4 p-2 border border-gray-300"
      />
      <div>
        {tracks.map((track) => (
          <div key={track.trackId} className="mb-4">
            <h3>{track.trackName}</h3>
            <p>{track.artistName}</p>
            <button onClick={() => onTrackSelect(track)} className="p-2 bg-blue-500 text-white">
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
