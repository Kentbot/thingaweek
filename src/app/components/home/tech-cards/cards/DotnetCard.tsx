import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function DotnetCard() {
  return (
    <Card>
      <Link href={"https://dotnet.microsoft.com/en-us/"}>
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