import { IStreaming } from '@mulister/shared';
import { PlayList } from 'src/domain/playlist.entity';

export class TransferPlaylistsService {
  constructor(
    private readonly playlists: PlayList[],
    private readonly streamingAdapter: IStreaming,
  ) {}

  async execute(): Promise<void> {
    for (const playlist of this.playlists) {
      try {
        await this.transferSinglePlaylist(playlist);
      } catch (error) {
        console.error(
          `Error transferring playlist: ${playlist.getName()}`,
          error,
        );
      }
    }
  }

  private async transferSinglePlaylist(playlist: PlayList): Promise<void> {
    try {
      await this.streamingAdapter.createPlaylist(playlist);
    } catch (error) {
      console.error(`Error creating playlist: ${playlist.getName()}`, error);
    }
  }
}
