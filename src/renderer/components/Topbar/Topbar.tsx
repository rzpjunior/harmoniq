import React from 'react';
import { FaHome, FaSearch, FaNewspaper, FaTimes } from 'react-icons/fa';
import { IoMdNotificationsOutline, IoMdSettings } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../Sidebar/SidebarContext';
import { useSearch } from '../Search/SearchContext';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarMinimized } = useSidebar();
  const { isSearchActive, setIsSearchActive, searchQuery, setSearchQuery } = useSearch();

  const handleHomeClick = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    navigate('/home');
  };

  const handleArtistsFeedClick = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    navigate('/artists-feed');
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
    navigate('/search');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`flex items-center justify-between h-16 p-4 bg-black text-customGray fixed top-0 left-0 right-0 z-20 ${isSidebarMinimized ? 'ml-[3.75rem] pl-9' : 'ml-64'}`}>
      <div className="flex items-center space-x-6">
        <div 
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${isActive('/home') ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`} 
          onClick={handleHomeClick}
        >
          <FaHome className="text-xl" />
          <span>Home</span>
        </div>
        <div 
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${isActive('/artists-feed') ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`} 
          onClick={handleArtistsFeedClick}
        >
          <FaNewspaper className="text-xl" />
          <span>Artists Feed</span>
        </div>
        {isSearchActive ? (
          <div className="flex items-center bg-gray-800 rounded-md">
            <FaSearch className="ml-2 text-xl text-white" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 rounded-md bg-gray-800 text-white focus:outline-none"
              placeholder="Search..."
            />
            {searchQuery && (
              <FaTimes className="mr-2 text-xl text-white cursor-pointer" onClick={clearSearch} />
            )}
          </div>
        ) : (
          <div 
            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${isActive('/search') ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`} 
            onClick={handleSearchClick}
          >
            <FaSearch className="text-xl" />
            <span>Search</span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center justify-center p-1 rounded-md hover:bg-gray-800 cursor-pointer">
          <IoMdNotificationsOutline className="text-xl" />
        </div>
        <div className="flex items-center justify-center p-1 rounded-md hover:bg-gray-800 cursor-pointer">
          <IoMdSettings className="text-xl" />
        </div>
        <div className="flex items-center justify-center p-1 rounded-md hover:bg-gray-800 cursor-pointer">
          <FiUser className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
