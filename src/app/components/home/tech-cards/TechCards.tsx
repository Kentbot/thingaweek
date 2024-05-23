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
          <img
            src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg"
            alt="Angular Icon"
            className={styles["tech-icon"]}
          />
        </div>
        <div className={styles["title"]}>
          Angular
        </div>
      </Card>
      <Card onClick={() => handleCardClick('react')} selected={selectedCard === 'react'}>
        <div className={styles["icon-wrapper"]}>
          <ReactIcon />
        </div>
      </Card>
      <Card onClick={() => handleCardClick('vue')} selected={selectedCard === 'vue'}>
        <div className={styles["icon-wrapper"]}>
          <VueIcon />
        </div>
      </Card>
      <Card onClick={() => handleCardClick('jsts')} selected={selectedCard === 'jsts'}>
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
      </Card>
      <Card onClick={() => handleCardClick('vite')} selected={selectedCard === 'vite'}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://vitejs.dev/logo-with-shadow.png"
            alt="Vite Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Card>
      <Card onClick={() => handleCardClick('webpack')} selected={selectedCard === 'webpack'}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://webpack.js.org/favicon.a3dd58d3142f7566.ico"
            alt="Webpack Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Card>
      <Card onClick={() => handleCardClick('csharp')} selected={selectedCard === 'csharp'}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://learn.microsoft.com/en-us/dotnet/media/logo_csharp.png"
            alt="C-Sharp Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Card>
      <Card onClick={() => handleCardClick('dotnet')} selected={selectedCard === 'dotnet'}>
        <div className={styles["icon-wrapper"]}>
          <img
            src="https://dotnet.microsoft.com/favicon.ico"
            alt="Dotnet Icon"
            className={styles["tech-icon"]}
          />
        </div>
      </Card>
    </div>
  )
}