import React, { useState } from 'react';
import Content from '../../components/HomeComponents/Content';
import Player from '../../components/HomeComponents/Player';

const HomePage = () => {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackSelect = (track: any) => {
    if (currentTrack && track.trackId === currentTrack.trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <Content onTrackSelect={handleTrackSelect} currentPlayingTrackId={currentTrack?.trackId} togglePlayPause={togglePlayPause} isPlaying={isPlaying}/>
      <Player currentTrack={currentTrack} isPlaying={isPlaying} togglePlayPause={togglePlayPause}/>
    </div>
  );
};

export default HomePage;