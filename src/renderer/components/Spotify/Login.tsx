import React, { useEffect, useState } from 'react';
import { getSpotifyAuthUrl, searchTracks } from '../../../services/spotifyService';
import { SpotifyPlayerState } from './types';

const Home: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(null);
  const [query, setQuery] = useState<string>('');
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem('spotifyToken');

    if (!token && hash) {
      const parsedToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1];
      if (parsedToken) {
        token = parsedToken;
        localStorage.setItem('spotifyToken', token);
        window.location.hash = '';
      }
    }

    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'My Web Player',
          getOAuthToken: (cb: (token: string) => void) => { cb(token); },
          volume: 0.5,
        });

        player.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceId(device_id);
        });

        player.addListener('player_state_changed', (state: SpotifyPlayerState) => {
          if (state) {
            console.log('Player State Changed', state);
            setPlayerState(state);
          }
        });

        player.connect();
      };
    }
  }, [token]);

  const login = () => {
    localStorage.removeItem('spotifyToken');
    window.location.href = getSpotifyAuthUrl();
  };

  const logout = () => {
    localStorage.removeItem('spotifyToken');
    setToken(null);
  };

  const handleSearch = async () => {
    if (query && token) {
      const searchResults = await searchTracks(query, token);
      setTracks(searchResults);
    }
  };

  const playTrack = (trackUri: string) => {
    if (token && deviceId) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [trackUri] }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => console.error('Error playing track:', error));
    }
  };

  return (
    <div>
      {!token ? (
        <button onClick={login}>Login with Spotify</button>
      ) : (
        <div>
          <p>Logged in with Spotify!</p>
          <button onClick={logout}>Logout</button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a track"
          />
          <button onClick={handleSearch}>Search</button>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>
                {track.name} by {track.artists.map((artist: any) => artist.name).join(', ')}
                <button onClick={() => playTrack(track.uri)}>Play</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
