import React, { useState } from 'react'

import { Card } from './Card'
import { ReactIcon } from '../icons/ReactIcon'

import styles from './cards.module.css'

export function ReactCard({ onClick, selected }: { onClick: () => void, selected?: boolean }) {
  console.log('react selected', selected)
  return (
    <Card onClick={onClick} selected={selected}>
      <div className={styles["icon-wrapper"]}>
        <ReactIcon />
      </div>
    </Card>
  )
}