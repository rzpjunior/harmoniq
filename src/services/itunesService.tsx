import axios from 'axios';

export const searchTracks = async (query: string) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: query,
        media: 'music',
        limit: 5,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching tracks from iTunes API:', error);
    return [];
  }
};
