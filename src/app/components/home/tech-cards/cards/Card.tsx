import React, { useEffect, useRef, useState } from 'react'

import useInView from '@/hooks/useInView'

import styles from './cards.module.css'

export function Card({ children }: React.PropsWithChildren) {
  const [inView, setInView] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(cardRef)

  useEffect(() => {
    if (isInView && !inView) {
      setInView(true)
    }
  }, [isInView, inView])

  return (
    <div
      className={`${styles["card"]}
      ${inView ? styles["in-view"] : ''}`}
      ref={cardRef}
    >
      {children}
    </div>
  )
}