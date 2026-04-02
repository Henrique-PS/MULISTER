import { StreamingAuthFactory } from '@/services/factories/streaming-auth.factory'
import * as SecureStore from 'expo-secure-store'
import { create } from 'zustand'

interface IStreamingAuth {
  streamingsTokens: { [key: string]: boolean }
  updateStreamingsTokens: (streamingsTokens: { [key: string]: boolean }) => void
  handleLogin: (streamingName: string) => void
  loadTokens: () => void
}

export const useStreamingAuth = create<IStreamingAuth>(set => ({
  streamingsTokens: {},
  updateStreamingsTokens: async (streamingsTokens: {
    [key: string]: boolean
  }) => {
    set({ streamingsTokens })
  },
  handleLogin: async (streamingName: string) => {
    const streamingAuthFactory = new StreamingAuthFactory()
    const streamingAuth = streamingAuthFactory.createStreamingAuth(
      streamingName.toLocaleLowerCase()
    )

    await streamingAuth.login()

    const updatedTokens = await SecureStore.getItemAsync(
      'streamings_tokens'
    ).then(tokens => (tokens ? JSON.parse(tokens) : {}))

    set({ streamingsTokens: updatedTokens })
  },
  loadTokens: async () => {
    const storedTokens = await SecureStore.getItemAsync('streamings_tokens')
    const tokens = storedTokens ? JSON.parse(storedTokens) : {}

    set({ streamingsTokens: tokens })
  }
}))
