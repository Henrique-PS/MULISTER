import { PlayList } from 'src/domain/playlist.entity'

export interface IStreaming {
  generateAccessToken(): Promise<string>
  getUserPlaylists(user_id: string): Promise<PlayList[]>
  createPlaylist(playlist: PlayList): Promise<void>
}

export type AccessTokenResponseDTO = {
  data: {
    access_token: string
    toke_type: string
    expires_in: number
  }
}
