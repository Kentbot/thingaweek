import React from 'react'

import Link from 'next/link'

import { Card } from './Card'

import styles from './cards.module.css'

export function AngularCard() {
  return (
    <Card>
      <Link href={"https://angular.io/"}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
            alt="Angular Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Link>
    </Card>
  )
}