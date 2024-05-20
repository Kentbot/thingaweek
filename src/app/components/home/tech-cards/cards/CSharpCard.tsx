import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function CSharpCard() {
  return (
    <Card>
      <Link href={"https://learn.microsoft.com/en-us/dotnet/csharp/"}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://learn.microsoft.com/en-us/dotnet/media/logo_csharp.png"
            alt="C-Sharp Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Link>
    </Card>
  )
}