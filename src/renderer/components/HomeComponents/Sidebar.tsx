import React from 'react';
import { FaHome, FaSearch, FaMusic, FaHeart, FaSave, FaFolder, FaPodcast, FaBookOpen, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-full bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">My Library</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <FaHome />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaSearch />
            <span>Discover</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaMusic />
            <span>Music</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaHeart />
            <span>Liked Songs</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaSave />
            <span>Saves</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaFolder />
            <span>Albums</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaPodcast />
            <span>Podcasts</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaBookOpen />
            <span>Audiobooks</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaUsers />
            <span>Artists</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
