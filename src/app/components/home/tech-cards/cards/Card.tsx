import React, { useMemo, useRef } from 'react'

import { useHasBeenInView } from '@/hooks/useInView'

import styles from '../techCard.module.css'

type Props = {
  selected?: boolean
  onClick: () => void
} & React.PropsWithChildren

export function Card({ children, selected, onClick }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const isInView = useHasBeenInView(cardRef)

  const classes = useMemo(
    () => [styles["card"], selected ? styles["show-content"] : undefined, isInView ? styles["in-view"] : undefined], 
    [ selected, isInView ]
  )

  return (
    <div
      className={classes.join(' ')}
      onClick={onClick}
      ref={cardRef}
    >
      {children}
    </div>
  )
}