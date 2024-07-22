import { ElectronHandler } from '../main/preload';
import { SpotifyPlayerState } from './components/Spotify/types'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => Spotify.Player;
    };
    electron: ElectronHandler;
    env: {
      API_BASE_URL: string;
    };
  }

  namespace Spotify {
    interface Player {
      connect(): Promise<boolean>;
      disconnect(): void;
      getCurrentState(): Promise<SpotifyPlayerState | null>;
      addListener(
        event: 'ready' | 'not_ready' | 'player_state_changed' | string,
        callback: (data: any) => void
      ): boolean;
    }
  }
}

export {};
