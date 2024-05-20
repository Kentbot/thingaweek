import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function WebpackCard() {
  return (
    <Card>
      <Link href={"https://webpack.js.org/"}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://webpack.js.org/favicon.a3dd58d3142f7566.ico"
            alt="Webpack Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Link>
    </Card>
  )
}