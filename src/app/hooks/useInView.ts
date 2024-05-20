import { useState, useEffect } from 'react'

export default function useInView(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false)

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref])

  return isIntersecting
}