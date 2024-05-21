import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function ViteCard({ onClick }: { onClick: () => void }) {
  return (
    <Card onClick={onClick}>
      <Link href={"/"}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://vitejs.dev/logo-with-shadow.png"
            alt="Vite Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Link>
    </Card>
  )
}