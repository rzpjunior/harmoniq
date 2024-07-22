const CLIENT_ID = '740c4bf033344b849040cce70d0b9cbb';
const REDIRECT_URI = 'http://localhost:1212/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming';

export const getSpotifyAuthUrl = () => {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
};

export const searchTracks = async (query: string, token: string) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};
