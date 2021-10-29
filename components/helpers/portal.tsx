import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const ref = useRef<Element>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#portal')!
    setMounted(true)
  }, [])

  return mounted ? createPortal(children, ref.current!) : null
}

export default Portal
