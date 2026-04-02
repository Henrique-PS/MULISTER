import {
  AccessTokensResponseDTO,
  GenerateTokensResponse,
  IStreaming,
} from '@mulister/shared';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PlayList } from 'src/domain/playlist.entity';

@Injectable()
export class SpotifyAdapter implements IStreaming {
  constructor() {}

  async generateTokens(code: string): Promise<GenerateTokensResponse> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
      const response: AccessTokensResponseDTO = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, refresh_token } = response.data;

      return { access_token, refresh_token };
    } catch (error) {
      throw new Error('Failed to fetch access token from Spotify: ' + error);
    }
  }

  async getUserPlaylists(): Promise<PlayList[]> {
    return await Promise.resolve([]);
  }

  async createPlaylist(playlist: PlayList): Promise<void> {
    console.log(playlist);
    return await Promise.resolve();
  }
}
