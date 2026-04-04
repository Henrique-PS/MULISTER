import { type IStreaming } from '@mulister/shared';
import { Injectable } from '@nestjs/common';
import { PlayList } from 'src/domain/playlist.entity';

@Injectable()
export class TransferPlaylistsService {
  constructor() {}

  async execute(
    playlists: PlayList[],
    streamingAdapter: IStreaming,
  ): Promise<void> {
    for (const playlist of playlists) {
      try {
        await this.transferSinglePlaylist(playlist, streamingAdapter);
      } catch (error) {
        console.error(
          `Error transferring playlist: ${playlist.getName()}`,
          error,
        );
      }
    }
  }

  private async transferSinglePlaylist(
    playlist: PlayList,
    streamingAdapter: IStreaming,
  ): Promise<void> {
    try {
      await streamingAdapter.createPlaylist(playlist);
    } catch (error) {
      console.error(`Error creating playlist: ${playlist.getName()}`, error);
    }
  }
}
