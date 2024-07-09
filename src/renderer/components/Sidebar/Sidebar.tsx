import React, { useState, useEffect } from 'react';
import { FaMusic, FaHeart, FaFolder, FaPodcast, FaBookOpen, FaUsers, FaBars } from 'react-icons/fa';
import { useSidebar } from '../Sidebar/SidebarContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarMinimized, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path: string) => {
    setActive(path);
  };

  return (
    <div className={`flex flex-col h-full bg-black-hq text-customGray ${isSidebarMinimized ? 'w-15' : 'w-64'}`}>
      <div className="h-16 p-4 flex justify-between items-center">
        {!isSidebarMinimized && <h1 className="text-2xl font-bold">My Library</h1>}
        <button onClick={toggleSidebar} className="text-xl flex items-center justify-center w-10 h-10">
          <FaBars />
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li className={`relative flex items-center space-x-2 group p-2 rounded-md ${active === '/playlists' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
            <Link
              to="/playlists"
              className="flex items-center space-x-2 w-full"
              onClick={() => handleItemClick('/playlists')}
            >
              <FaMusic className="text-2xl" />
              {!isSidebarMinimized && <span>Playlists</span>}
              {isSidebarMinimized && (
                <span className="absolute left-full ml-2 w-max bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  Playlists
                </span>
              )}
            </Link>
          </li>
          <li className={`relative flex items-center space-x-2 group p-2 rounded-md ${active === '/liked-songs' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
            <Link
              to="/liked-songs"
              className="flex items-center space-x-2 w-full"
              onClick={() => handleItemClick('/liked-songs')}
            >
              <FaHeart className="text-2xl" />
              {!isSidebarMinimized && <span>Liked Songs</span>}
              {isSidebarMinimized && (
                <span className="absolute left-full ml-2 w-max bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  Liked Songs
                </span>
              )}
            </Link>
          </li>
          <li className={`relative flex items-center space-x-2 group p-2 rounded-md ${active === '/albums' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
            <Link
              to="/albums"
              className="flex items-center space-x-2 w-full"
              onClick={() => handleItemClick('/albums')}
            >
              <FaFolder className="text-2xl" />
              {!isSidebarMinimized && <span>Albums</span>}
              {isSidebarMinimized && (
                <span className="absolute left-full ml-2 w-max bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  Albums
                </span>
              )}
            </Link>
          </li>
          <li className={`relative flex items-center space-x-2 group p-2 rounded-md ${active === '/podcasts' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
            <Link
              to="/podcasts"
              className="flex items-center space-x-2 w-full"
              onClick={() => handleItemClick('/podcasts')}
            >
              <FaPodcast className="text-2xl" />
              {!isSidebarMinimized && <span>Podcasts</span>}
              {isSidebarMinimized && (
                <span className="absolute left-full ml-2 w-max bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  Podcasts
                </span>
              )}
            </Link>
          </li>
          <li className={`relative flex items-center space-x-2 group p-2 rounded-md ${active === '/audiobooks' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
            <Link
              to="/audiobooks"
              className="flex items-center space-x-2 w-full"
              onClick={() => handleItemClick('/audiobooks')}
            >
              <FaBookOpen className="text-2xl" />
              {!isSidebarMinimized && <span>Audiobooks</span>}
              {isSidebarMinimized && (
                <span className="absolute left-full ml-2 w-max bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  Audiobooks
                </span>
              )}
            </Link>
          </li>
          <li className={`relative flex items-center space-x-2 group p-2 rounded-md ${active === '/artists' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
            <Link
              to="/artists"
              className="flex items-center space-x-2 w-full"
              onClick={() => handleItemClick('/artists')}
            >
              <FaUsers className="text-2xl" />
              {!isSidebarMinimized && <span>Artists</span>}
              {isSidebarMinimized && (
                <span className="absolute left-full ml-2 w-max bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
                  Artists
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
