import { IStreaming } from '@mulister/shared';
import { Injectable } from '@nestjs/common';
import { SpotifyAdapter } from '../adapters/spotify.adapter';

@Injectable()
export class StreamingAdapterFactory {
  constructor() {}

  createStreamingAdapter(stremingName: string): IStreaming {
    switch (stremingName) {
      case 'spotify':
        return new SpotifyAdapter();
      default:
        throw new Error('Streaming adapter not found');
    }
  }
}
