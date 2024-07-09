import React from 'react';
import { FaHome, FaSearch, FaNewspaper } from 'react-icons/fa';
import { IoMdNotificationsOutline, IoMdSettings } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';

const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 text-white fixed top-0 left-0 right-0 z-20 ml-64">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <FaHome className="text-xl" />
          <span>Home</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaNewspaper className="text-xl" />
          <span>Artists Feed</span>
        </div>
        <div className="flex items-center space-x-2">
        <FaSearch className="text-xl" />
          <span>Search</span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <IoMdNotificationsOutline className="text-xl" />
        <IoMdSettings className="text-xl" />
        <FiUser className="text-xl" />
      </div>
    </div>
  );
};

export default TopBar;
