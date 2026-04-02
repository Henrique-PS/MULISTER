import { SpotifyAuthService } from '../spotify-auth.service'

export class StreamingAuthFactory {
  createStreamingAuth(stremingName: string) {
    switch (stremingName) {
      case 'spotify':
        return new SpotifyAuthService()
      default:
        throw new Error('Streaming auth not found')
    }
  }
}
