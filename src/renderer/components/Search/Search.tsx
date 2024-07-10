import React, { useState, useEffect } from 'react';
import { searchTracks } from '../../../services/itunesService';
import { useSearch } from './SearchContext';
import SearchDefault from './SearchDefault';
import { FaPause, FaPlay } from 'react-icons/fa';

interface SearchProps {
  onTrackSelect: (track: any) => void;
  currentPlayingTrackId: string | null;
  togglePlayPause: () => void;
  isPlaying: boolean;
}

const Search: React.FC<SearchProps> = ({ onTrackSelect, currentPlayingTrackId, togglePlayPause, isPlaying }) => {
  const { searchQuery } = useSearch();
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      if (searchQuery) {
        const result = await searchTracks(searchQuery);
        setTracks(result);
      }
    };

    fetchTracks();
  }, [searchQuery]);

  const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  };

  return (
    <div className="flex-1 p-4 pt-7">
      {searchQuery ? (
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
                  className=" flex items-center justify-center w-12 h-12 bg-primaryHq text-white rounded-full"
                >
                  {currentPlayingTrackId === track.trackId && isPlaying ? 
                    <FaPause />
                    : 
                    <FaPlay />
                  }
                </button>
                <button className="p-1 text-gray-700 ml-2">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SearchDefault />
      )}
    </div>
  );
};

export default Search;
