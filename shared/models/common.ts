export interface IPlaylist {
  getName(): string
  changeName(newName: string): void
}

export type AccessTokensResponseDTO = {
  data: {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token?: string
  }
}

export type GenerateTokensResponse = {
  access_token: string
  refresh_token?: string
}

export interface IStreaming {
  generateTokens(code: string): Promise<GenerateTokensResponse>
  getUserPlaylists(user_id: string): Promise<IPlaylist[]>
  createPlaylist(playlist: IPlaylist): Promise<void>
}

export type StreamingPlataform = 'spotify' | 'youtube'
