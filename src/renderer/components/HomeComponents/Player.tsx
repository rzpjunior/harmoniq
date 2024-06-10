import React from 'react';
import AudioPlayer from '../Player/AudioPlayer';

interface PlayerProps {
  currentTrack: any;
}

const Player: React.FC<PlayerProps> = ({ currentTrack }) => {
  return <AudioPlayer track={currentTrack || {}} />;
};

export default Player;
