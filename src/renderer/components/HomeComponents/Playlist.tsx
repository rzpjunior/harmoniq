// Playlist.tsx

import React from 'react';

const Playlist = () => {
  return (
    <div className="w-1/4 p-4 border-r border-gray-300 bg-black text-white">
      {/* Playlist Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Playlists</h2>
        {/* Placeholder playlist items */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-700 mr-2"></div>
          <span className="text-sm text-gray-200">Playlist Name</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-700 mr-2"></div>
          <span className="text-sm text-gray-200">Another Playlist</span>
        </div>
        {/* Add more playlist items as needed */}
      </div>
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-2 py-1 border border-gray-300 rounded"
          style={{ backgroundColor: '#001F33', color: 'white' }}
        />
      </div>
    </div>
  );
};

export default Playlist;
