import { AccessTokenResponseDTO, IStreaming } from '@mulister/shared';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PlayList } from 'src/domain/playlist.entity';

@Injectable()
export class SpotifyAdapter implements IStreaming {
  constructor() {}

  async generateAccessToken(): Promise<string> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
      const response: AccessTokenResponseDTO = await axios.post(
        'https://accounts.spotify.com/api/token',
        `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const access_token: string = response.data.access_token;

      return access_token;
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
