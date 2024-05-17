'use client'

import React from 'react'

import AboutBudget from './sections/budget.mdx'
import SiteOverview from './sections/siteOverview.mdx'

import styles from './styles.module.css'

export default function About() {
  return (
    <div className={styles["about-container"]}>
      <SiteOverview/>
      <AboutBudget />
    </div>
  )
}