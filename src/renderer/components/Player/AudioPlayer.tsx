import React, { useRef, useEffect, useState } from 'react';
import { FaPause, FaBackward, FaForward, FaRandom, FaVolumeUp, FaPlay } from 'react-icons/fa';
import { MdRepeat } from 'react-icons/md';
import { AiFillHeart, AiOutlinePlus, AiOutlineMenu, AiOutlineEllipsis } from 'react-icons/ai';

import { debounce } from 'lodash';

import { useSidebar } from '../Sidebar/SidebarContext';

interface AudioPlayerProps {
  track: any;
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleTrackEnd: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, isPlaying, togglePlayPause, handleTrackEnd }) => {
  const { isSidebarMinimized } = useSidebar();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleAudioEnd = () => {
        console.log("Track ended");
        handleTrackEnd();
      };

      audio.addEventListener('ended', handleAudioEnd);

      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, [handleTrackEnd]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && track) {
      if (audio.src !== track.previewUrl) {
        audio.src = track.previewUrl;
        audio.load();
      }

      if (isPlaying) {
        audio.play().catch(error => console.error("Error playing the track: ", error));
      } else {
        audio.pause();
      }
    }
  }, [track, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const debouncedVolumeChange = debounce((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, 100);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    debouncedVolumeChange(newVolume);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

  return (
    <div className={`rounded-xl fixed bottom-2 flex items-center justify-between p-4 bg-gray-800 text-gray-400 ${isSidebarMinimized ? 'w-[calc(100%-4.9rem)]' : 'w-[calc(100%-16.4rem)]'}`}>
        <div className="flex items-center space-x-4">
            <button onClick={togglePlayPause} className=" flex items-center justify-center w-12 h-12 bg-midPurple text-white rounded-full">
              {isPlaying ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )
              }
            </button>
            <button className="text-xl"><FaBackward /></button>
            <button className="text-xl"><FaForward /></button>
            <button className="text-xl"><FaRandom /></button>
            <button className="text-xl"><MdRepeat /></button>
        </div>
        <div className="flex items-center space-x-4 flex-1 mx-4 w-38">
            <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 appearance-none"
                    style={{
                        background: `linear-gradient(to right, #f0f0f0 ${currentTime / duration * 100}%, #4b5563 0%)`,
                    }}
                />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                  {track && (
                    <img src={track.artworkUrl60} alt="Album Art" className="w-12 h-12 rounded-md" />
                  )}
                  <div>
                    <div className="overflow-hidden whitespace-nowrap w-38">
                      <p className={`text-white text-sm ${track && track.trackName.length > 25 ? 'marquee' : ''}`}>{track ? track.trackName : 'No Track Selected'}</p>
                    </div>
                      <p className="text-gray-400 text-xs">{track ? track.artistName : ''}</p>
                  </div>
              </div>
              <button className="text-xl"><AiFillHeart /></button>
              <button className="text-xl"><AiOutlinePlus /></button>
              <div className="flex items-center space-x-2">
                  <FaVolumeUp className="text-2xl" />
                  <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-gray-600 rounded-full appearance-none"
                      style={{
                          background: `linear-gradient(to right, #f0f0f0 ${volume * 100}%, #4b5563 0%)`
                      }}
                  />
              </div>
              <button className="text-xl"><AiOutlineEllipsis /></button>
              <button className="text-xl"><AiOutlineMenu /></button>
          </div>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
    </div>
  );
};

export default AudioPlayer;