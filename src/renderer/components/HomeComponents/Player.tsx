import React from 'react';
import AudioPlayer from '../Player/AudioPlayer';

interface PlayerProps {
  currentTrack: any;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, togglePlayPause }) => {
  return <AudioPlayer track={currentTrack} isPlaying={isPlaying} togglePlayPause={togglePlayPause} />;
};

export default Player;