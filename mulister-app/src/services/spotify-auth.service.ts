import { GenerateTokensResponseDTO } from '@mulister/shared'
import * as Crypto from 'expo-crypto'
import * as Linking from 'expo-linking'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'
import axiosInstance from './api'

export class SpotifyAuthService {
  async login(): Promise<string | undefined> {
    const state = Crypto.getRandomBytes(16).toString()
    const scope = 'user-read-private user-read-email'
    const client_id = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || ''
    const redirectUri = Linking.createURL('/')

    try {
      const authEndpoint = 'https://accounts.spotify.com/authorize'

      const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
      }).toString()

      const authUrl = `${authEndpoint}?${queryParams}`
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri)

      if (result.type === 'success') {
        const parseUrl = Linking.parse(result.url)
        const code = parseUrl.queryParams?.code as string

        await this.generateTokens(code)
      }

      return undefined
    } catch (error) {
      throw new Error('Erro ao realizar login: ' + error)
    }
  }

  async generateTokens(code: string): Promise<void> {
    try {
      const response: GenerateTokensResponseDTO = await axiosInstance.post(
        'streaming',
        { name: 'spotify', code }
      )

      const storedTokens = await SecureStore.getItemAsync('streamings_tokens')
      const tokens = storedTokens ? JSON.parse(storedTokens) : {}

      tokens.spotify = {
        access_token: response.access_token,
        refresh_token: response.refresh_token
      }

      await SecureStore.setItemAsync(
        'streamings_tokens',
        JSON.stringify(tokens)
      )
    } catch (error) {
      throw new Error('Erro ao gerar tokens: ' + error)
    }
  }
}
