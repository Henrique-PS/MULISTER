import { useInitializeApp } from '@/viewmodels/useInitializeApp'
import { useStreamingAuth } from '@/viewmodels/useStreamingAuth'
import { useStreamingList } from '@/viewmodels/useStreamingList'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'

export default function PlatformListView() {
  const { streamings } = useStreamingList()
  const { handleLogin, loadTokens, streamingsTokens } = useStreamingAuth()

  useInitializeApp(loadTokens)

  return (
    <View>
      {streamings.map(streaming => {
        const isLoggedIn = streamingsTokens[streaming.name.toLowerCase()]

        return (
          <IconButton
            key={streaming.name}
            icon={streaming.icon}
            size={60}
            onPress={() => handleLogin(streaming.name)}
            iconColor={isLoggedIn ? '#1DB954' : 'gray'}
          />
        )
      })}
    </View>
  )
}
