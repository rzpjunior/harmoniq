import React, { useState } from 'react';
import Content from '../../components/HomeComponents/Content';
import Information from '../../components/HomeComponents/Information';
import Playlist from '../../components/HomeComponents/Playlist';
import Player from '../../components/HomeComponents/Player';


const HomePage = () => {
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  const handleTrackSelect = (track: any) => {
    setCurrentTrack(track);
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <Playlist/>
      <Content onTrackSelect={handleTrackSelect}/>
      <Information/>
      <Player currentTrack={currentTrack}/>
    </div>
  );
};

export default HomePage;