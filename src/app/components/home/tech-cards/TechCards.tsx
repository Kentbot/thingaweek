import React from 'react'

import { TypescriptCard } from './cards/TypescriptCard'
import { ViteCard } from './cards/ViteCard'
import { CSharpCard } from './cards/CSharpCard'
import { DotnetCard } from './cards/DotnetCard'
import { WebpackCard } from './cards/WebpackCard'
import { VueCard } from './cards/VueCard'
import { AngularCard } from './cards/AngularCard'
import { ReactCard } from './cards/ReactCard'

import styles from './techCard.module.css'

export function TechCards() {
  return (
    <div className={styles["tech-cards"]}>
      <ReactCard />
      <AngularCard />
      <VueCard />
      <ViteCard />
      <WebpackCard />
      <DotnetCard />
      <CSharpCard />
      <TypescriptCard />
    </div>
  )
}