'use client'

import React from 'react'

import { TechCards } from './components/home/tech-cards/TechCards'

import styles from './styles.module.css'

export default function Home() {
  return (
    <div className={styles["container"]}>
      <h4>
        Hello!
      </h4>
      <div>
        My name is Kent Miller and I&apos;m a web developer. I have nearly a decade of experience
        working on all sorts of projects with many types of teams. I&apos;ve worked for a variety of
        companies, from small contracting firm to Fortune 500, and I believe there is always something to
        learn!
      </div>
      <div>
        I have experience working with many web technologies from front-end back to the database:
        <TechCards />
      </div>
    </div>
  )
}

