import React from 'react'

import { TechCards } from './components/home/tech-cards/TechCards'

import styles from './styles.module.css'

export default function Home() {
  return (
    <div className={styles["container"]}>
      <div className={styles["section"]}>
        <div className={styles["header"]}>
          About Me
        </div>
        <div className={styles["about-contents"]}>
          <div className={`${styles["subsection"]} w-90`}>
            <img className={styles["header-pic"]} src="./waterfall_pic.jpg" alt="Kent Profile Picture" />
            My name is Kent Miller and I&apos;m a web developer. I have nearly a decade of experience
            working on all sorts of projects with many types of teams. I&apos;ve worked for a variety of
            companies, from small contracting firm to Fortune 500, and I believe there is always
            something to learn!
          </div>
          <div className={`${styles["subsection"]}`}>
            <blockquote>
              <p>
                I believe a good developer isn&apos;t just someone that knows design patterns, problem solving,
                and how to write clean code (though these are all important!).
                They&apos;re someone that cares about everyone that they, and their code, interact with:
                coworkers, users, testers, stakeholders, and beyond.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
      <div className={styles["section"]}>
        <div className={styles["header"]}>
          Skills
        </div>
        <div className={styles["subsection"]}>
          <div className={styles["header"]}>
            Interpersonal Skills
          </div>
          I believe that some of the most valuable skills to possess and hone are &ldquo;soft&rdquo;
          interpersonal skills. On every team I&apos;ve worked with I have strived to build connection
          with my coworkers. I have organized or participated in groups for recruiting, STEM outreach,
          public speaking, and team-building.
        </div>
        <div className={styles["subsection"]}>
          <div className={styles["header"]}>
            Technical Skills
          </div>
          I have worked in a few different roles as a developer over the course of my career: from
          full stack web development (designing and implementing web pages, managing API&apos;s,
          developing database schemas) to maintaining desktop applications. My passion lies in
          web development, particularly front-end development, but I am comfortable working in all
          the different layers of the web.
          <br/>
          <br/>
          My two favorite things about web development are the continuous learning required and the
          satisfaction that comes when users give feedback - both positive and constructive. My whole
          career has been non-stop learning, either I&apos;m learning a new technology stack or framework,
          or I&apos;m deepening my knowledge of something I already have experience with. Even this website
          has been a learning experience for me! (It is built with Next.js, which I have not gotten to use
          professionally... yet!)
        </div>
      </div>
      <div className={styles["section"]}>
        <div className={styles["header"]}>
          Familiar Technologies
        </div>
        I have experience working with many web technologies from front-end back to the database:
        <TechCards />
      </div>
    </div>
  )
}

