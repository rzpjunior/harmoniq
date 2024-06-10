import React from 'react';
import AudioPlayer from '../Player/AudioPlayer';

interface PlayerProps {
  currentTrack: any;
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleTrackEnd: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, togglePlayPause, handleTrackEnd }) => {
  return <AudioPlayer track={currentTrack} isPlaying={isPlaying} togglePlayPause={togglePlayPause} handleTrackEnd={handleTrackEnd} />;
};

export default Player;