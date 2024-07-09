import React from 'react';
import Search from '../../components/HomeComponents/Search';

interface HomePageProps {
  handleTrackSelect: (track: any) => void;
  currentTrack: any;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ handleTrackSelect, currentTrack, isPlaying, togglePlayPause }) => {
  return (
    <div className="flex-1 flex flex-col">
      <Search
        onTrackSelect={handleTrackSelect}
        currentPlayingTrackId={currentTrack?.trackId}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default HomePage;
