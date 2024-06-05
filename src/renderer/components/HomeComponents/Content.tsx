// Content.tsx

import React from 'react';

const Content = () => {
  return (
    <div className="w-1/2 p-4 bg-black text-white">
      {/* Banner */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Banner</h2>
        {/* Placeholder content for banner */}
      </div>
      {/* Recent Music */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Recent Music</h2>
        {/* Placeholder content for recent music */}
      </div>
      {/* Recommendations */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
        {/* Placeholder content for recommendations */}
      </div>
    </div>
  );
};

export default Content;
