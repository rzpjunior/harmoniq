import React, { useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface AudioPlayerProps {
  track: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = track.previewUrl;
      audio.load();
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => console.error("Error playing the track: ", error));

      const handleAudioEnd = () => {
        setIsPlaying(false);
      };

      audio.addEventListener('ended', handleAudioEnd);

      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
      }
    }, [track, volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3>{track.trackName}</h3>
          <p>{track.artistName}</p>
        </div>
        <div className="flex items-center">
          <button onClick={togglePlayPause} className="mr-2">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="mr-2">Next</button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="ml-2"
          />
        </div>
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
