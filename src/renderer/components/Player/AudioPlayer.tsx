import React, { useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface AudioPlayerProps {
  track: any;
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleTrackEnd: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, isPlaying, togglePlayPause, handleTrackEnd }) => {
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

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {track && (
            <img src={track.artworkUrl60} alt="Album Art" className="w-12 h-12 mr-4" />
          )}
          <div className="overflow-hidden whitespace-nowrap w-48">
            <h3 className={`text-lg ${track && track.trackName.length > 20 ? 'marquee' : ''}`}>
              {track ? track.trackName : 'No Track Selected'}
            </h3>
            <p className="text-sm text-gray-400">{track ? track.artistName : ''}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={togglePlayPause} className="mx-2">
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 mx-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full"
        />
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