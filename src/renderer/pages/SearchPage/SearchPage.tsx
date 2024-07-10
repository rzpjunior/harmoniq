import React from 'react';
import Search from '../../components/Search/Search';

interface SearchPageProps {
  handleTrackSelect: (track: any) => void;
  currentTrack: any;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ handleTrackSelect, currentTrack, isPlaying, togglePlayPause }) => {
  return (
    <div className="flex-1 flex flex-col mr-2 border border-gray-700 rounded-xl">
      <Search
        onTrackSelect={handleTrackSelect}
        currentPlayingTrackId={currentTrack?.trackId}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default SearchPage;
