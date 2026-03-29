import { Module } from '@nestjs/common';
import { TransferPlaylistsService } from 'src/application/use-cases/tranfer-playlists.service';
import { SpotifyAdapter } from './adapters/spotify.adapter';
import { StreamingController } from './controllers/streaming.controller';
import { StreamingAdapterFactory } from './factories/streaming-adapter.factory';

@Module({
  imports: [],
  controllers: [StreamingController],
  providers: [
    SpotifyAdapter,
    StreamingAdapterFactory,
    TransferPlaylistsService,
  ],
})
export class StreamingModule {}
