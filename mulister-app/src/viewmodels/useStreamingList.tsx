export interface IStreaming {
  name: string
  icon: string
}

interface StreamingListState {
  streamings: IStreaming[]
}

const streamings: IStreaming[] = [
  {
    name: 'Spotify',
    icon: 'spotify'
  }
]

export const useStreamingList = (): StreamingListState => {
  return {
    streamings: streamings
  }
}
