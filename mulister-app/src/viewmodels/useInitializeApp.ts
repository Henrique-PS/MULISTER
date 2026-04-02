import { useEffect } from 'react'

export function useInitializeApp(action: () => void) {
  useEffect(() => {
    action()
  }, [])
}
