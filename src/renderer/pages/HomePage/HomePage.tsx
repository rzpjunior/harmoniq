import React from 'react';
import Content from '../../components/HomeComponents/Content';
import Information from '../../components/HomeComponents/Information';
import Playlist from '../../components/HomeComponents/Playlist';
import Player from '../../components/HomeComponents/Player';


const HomePage = () => {
  return (
    <div className="flex justify-center items-start h-screen">
      <Playlist/>
      <Content/>
      <Information/>
      <Player/>
    </div>
  );
};

export default HomePage;