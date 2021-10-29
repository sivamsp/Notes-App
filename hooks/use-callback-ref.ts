import { useCallback, useState } from 'react'

function useCallbackRef<E extends Element>(): [
  E | null,
  (element: E | null) => void,
] {
  const [element, setElement] = useState<E | null>(null)
  const callbackRef = useCallback((elem: E | null) => {
    setElement(elem)
  }, [])
  return [element, callbackRef]
}

export default useCallbackRef
