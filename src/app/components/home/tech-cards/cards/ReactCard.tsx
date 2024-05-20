import React from 'react'

import Link from 'next/link'

import { Card } from './Card'
import { ReactIcon } from '../../icons/ReactIcon'

import styles from './cards.module.css'

export function ReactCard() {
  return (
    <Card>
      <Link href={"https://react.dev/"}>
        <div className={styles["icon-wrapper"]}>
          <ReactIcon />
        </div>
      </Link>
    </Card>
  )
}