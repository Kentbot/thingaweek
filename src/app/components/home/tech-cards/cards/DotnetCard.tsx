import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function DotnetCard({ onClick }: { onClick: () => void }) {
  return (
    <Card onClick={onClick}>
      <Link href={"/"}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://dotnet.microsoft.com/favicon.ico"
            alt="Dotnet Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Link>
    </Card>
  )
}