import React from 'react'

import Link from 'next/link'

import { Card } from './Card'
import { VueIcon } from '../../icons/VueIcon'

import styles from './cards.module.css'

export function VueCard() {
  return (
    <Card>
      <Link href={"https://vuejs.org/"}>
        <div className={styles["icon-wrapper"]}>
          <VueIcon />
        </div>
      </Link>
    </Card>
  )
}