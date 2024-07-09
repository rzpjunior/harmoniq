import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ErrorBoundary from './components/Error/ErrorBoundary';
import Sidebar from './components/HomeComponents/Sidebar';
import Topbar from './components/HomeComponents/Topbar';
import AudioPlayer from './components/Player/AudioPlayer';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackSelect = (track: any) => {
    if (currentTrack && track.trackId === currentTrack.trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <div className="flex-1 overflow-auto mt-16">
              <Routes>
                <Route 
                  path="/" 
                  element={<LoginPage />} 
                />
                <Route 
                  path="/Home" 
                  element={
                    <HomePage 
                      handleTrackSelect={handleTrackSelect}
                      currentTrack={currentTrack}
                      isPlaying={isPlaying}
                      togglePlayPause={togglePlayPause}
                    />
                  } 
                />
              </Routes>
            </div>
            <AudioPlayer 
              track={currentTrack} 
              isPlaying={isPlaying} 
              togglePlayPause={togglePlayPause} 
              handleTrackEnd={handleTrackEnd} 
            />
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
