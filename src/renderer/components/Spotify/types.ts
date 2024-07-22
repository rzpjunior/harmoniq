// types.ts (or add directly in your component file)
export interface SpotifyPlayerState {
    context: {
      uri: string;
      metadata: any;
    };
    disallows: {
      [key: string]: boolean;
    };
    paused: boolean;
    position: number;
    duration: number;
    repeat_mode: number;
    shuffle: boolean;
    track_window: {
      current_track: {
        uri: string;
        id: string;
        name: string;
        album: {
          uri: string;
          name: string;
          images: { url: string }[];
        };
        artists: { uri: string; name: string }[];
      };
      next_tracks: any[];
      previous_tracks: any[];
    };
  }
  