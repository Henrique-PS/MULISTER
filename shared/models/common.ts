import { PlayList } from 'src/domain/playlist.entity'

export interface IStreaming {
  login(): Promise<void>
  getUserPlaylists(user_id: string): Promise<PlayList[]>
  createPlaylist(playlist: PlayList): Promise<void>
}
