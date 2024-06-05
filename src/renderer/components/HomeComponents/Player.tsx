// Player.tsx

import React from 'react';

const Player = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4">
      {/* Music player controls */}
      <div className="flex items-center justify-center">
        {/* Placeholder music player controls */}
        <button className="mr-2">Play</button>
        <button className="mr-2">Pause</button>
        <button className="mr-2">Next</button>
        <input type="range" min="0" max="100" defaultValue="50" className="w-full"/>
      </div>
    </div>
  );
};

export default Player;
