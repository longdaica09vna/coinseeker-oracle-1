import { useEffect, useCallback, DependencyList, useState } from 'react'

export default function useDebounce(
  effect: any,
  dependencies: DependencyList,
  delay: number,
  setLoadingDebounce: (value: boolean) => void,
  stop?: boolean,
) {
  const callback = useCallback(effect, dependencies)
  const [initial, setInital] = useState(true)

  useEffect(() => {
    if (!initial) {
      if (stop) {
        return
      }
      setLoadingDebounce(true)
      const timeout = setTimeout(() => {
        setLoadingDebounce(false)
        callback()
      }, delay)
      return () => clearTimeout(timeout)
    }
    setInital(false)
  }, [callback, delay])
}
