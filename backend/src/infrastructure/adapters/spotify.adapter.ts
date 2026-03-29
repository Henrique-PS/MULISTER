import { IStreaming } from '@mulister/shared';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PlayList } from 'src/domain/playlist.entity';

@Injectable()
export class SpotifyAdapter implements IStreaming {
  constructor() {}

  async getAccessToken(): Promise<string> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          grant_type: 'client_credentials',
        },
      );

      return response.data as string;
    } catch (error) {
      console.error('Error fetching access token from Spotify:', error);
      throw new Error('Failed to fetch access token from Spotify');
    }
  }

  async getUserPlaylists(): Promise<PlayList[]> {
    return await Promise.resolve([]);
  }

  async createPlaylist(playlist: PlayList): Promise<void> {
    return await Promise.resolve();
  }
}
