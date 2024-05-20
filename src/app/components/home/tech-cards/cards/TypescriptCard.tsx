import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function TypescriptCard() {
  return (
    <Card>
      <Link href={"/"}>
        <div className={styles["icon-wrapper"]} id={styles["icon-1"]}>
          <img
            src="https://www.typescriptlang.org/icons/icon-144x144.png?v=8944a05a8b601855de116c8a56d3b3ae"
            alt="Typescript Icon"
            className={styles["tech-icon"]}
          />
        </div>
        <div className={styles["icon-wrapper"]} id={styles["icon-2"]}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/320px-Unofficial_JavaScript_logo_2.svg.png"
            alt="Javascript Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Link>
    </Card>
  )
}