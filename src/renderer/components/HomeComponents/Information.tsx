import React from 'react';

const Information = () => {
  return (
    <div className="w-1/4 p-4 border-l border-gray-300 bg-gray-100">
      {/* Current Music Playing */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Current Music Playing</h2>
        {/* Placeholder content for current music */}
      </div>
      {/* Music Player Controls */}
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

export default Information;
