import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function CSharpCard({ onClick }: { onClick: () => void }) {
  return (
    <Card onClick={onClick}>
      <Link href={"/"}>
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