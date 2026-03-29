import { PlayList } from 'src/domain/playlist.entity'

export interface IStreaming {
  getAccessToken(): Promise<string>
  getUserPlaylists(user_id: string): Promise<PlayList[]>
  createPlaylist(playlist: PlayList): Promise<void>
}
