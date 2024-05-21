import React, { useState } from 'react'

import { TypescriptCard } from './cards/TypescriptCard'
import { ViteCard } from './cards/ViteCard'
import { CSharpCard } from './cards/CSharpCard'
import { DotnetCard } from './cards/DotnetCard'
import { WebpackCard } from './cards/WebpackCard'
import { VueCard } from './cards/VueCard'
import { AngularCard } from './cards/AngularCard'
import { ReactCard } from './cards/ReactCard'

import styles from './techCard.module.css'
import { Card } from './cards/Card'
import Link from 'next/link'
import { ReactIcon } from './icons/ReactIcon'
import { VueIcon } from './icons/VueIcon'

export function TechCards() {
  const [selectedCard, setSelectedCard] = useState('')

  const handleCardClick = (newSelectedCard: string) => {
    if (newSelectedCard === selectedCard) {
      setSelectedCard('')
    } else {
      setSelectedCard(newSelectedCard)
    }
  }

  return (
    <div className={styles["tech-cards"]}>
      <Card onClick={() => handleCardClick('angular')} selected={selectedCard === 'angular'}>
        <div className={styles["icon-wrapper"]}>
          <Link href={"/"} style={{ "display": "flex", "justifyContent": "space-evenly" }}>
              <img
                src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
                alt="Angular Icon"
                className={styles["tech-icon"]}
              />
          </Link>
        </div>
      </Card>
      <Card onClick={() => handleCardClick('react')} selected={selectedCard === 'react'}>
        <div className={styles["icon-wrapper"]}>
          <ReactIcon />
        </div>
      </Card>
      <Card onClick={() => handleCardClick('vue')} selected={selectedCard === 'vue'}>
        <Link href={"/"}>
          <div className={styles["icon-wrapper"]}>
            <VueIcon />
          </div>
        </Link>
      </Card>
    </div>
  )
}