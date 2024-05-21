import React from 'react'

import Link from 'next/link'

import { Card } from './Card'
import { VueIcon } from '../icons/VueIcon'

import styles from './cards.module.css'

export function VueCard({ onClick }: { onClick: () => void }) {
  return (
    <Card onClick={onClick}>
      <Link href={"/"}>
        <div className={styles["icon-wrapper"]}>
          <VueIcon />
        </div>
      </Link>
    </Card>
  )
}