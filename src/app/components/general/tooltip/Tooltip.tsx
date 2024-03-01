import React from 'react'

type Props = {
  onClick: () => void
}

import styles from './styles.module.scss'

export function Tooltip({ onClick }: Props) {
  return (
    <span className={styles["tooltip-btn"]} onClick={onClick}>?</span>
  )
}