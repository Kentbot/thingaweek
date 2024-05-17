'use client'
import React from 'react'

import styles from './styles.module.css'

const luxonImgSrc = 'https://moment.github.io/luxon/docs/_media/Luxon_icon_64x64.png'
const currencyJsImgSrc = 'https://user-images.githubusercontent.com/1062039/31397824-9dfa15f0-adac-11e7-9869-fb20746e90c1.png'
const papaparseImgSrc = 'https://www.papaparse.com/favicon.ico'
const nanoidImgSrc = 'https://camo.githubusercontent.com/1217981e015858c201536e6f7822e1fc30ab66c4060462da9e80f65e701893bd/68747470733a2f2f61692e6769746875622e696f2f6e616e6f69642f6c6f676f2e737667'

export default function AboutBudget() {
  return (
    <div className={styles["about-budget"]}>
      <h2>
        Budget Application
      </h2>
      <div>
        This application was developed for me to track my family&apos;s monthly budget. It uses react
        (since this site is a Next.js app) and redux as the state store. Virtually all components
        are written from scratch, as I used this experience to hone my CSS/SASS and react skills
        rather than relying on third-party applications.
      </div>
      <div>
        I did however use a few third-party applications to make getting to functionality simpler.
        They are:
      </div>
      <div className={styles["card-container"]}>
        <LibraryCard iconSource={luxonImgSrc} title={'Luxon'}>
          For its ability to convert and keep track of times. Once the Temporal API is
          finalized and adopted by browsers I will probably drop this dependency.
        </LibraryCard>
        <LibraryCard iconSource={currencyJsImgSrc} title={'Currency.js'}>
          I didn&apos;t want to get bogged down handling floating point nastiness with
          a budgeting application, and currency.js allows me to just add two currencies together
          and know that the math will work. (Of course I still have tests for the actual math 
          being done, e.g. tests for the calculation of a current month&apos;s balance)
        </LibraryCard>
        <LibraryCard iconSource={papaparseImgSrc} title={'papaparse'}>
          For parsing CSV transaction data. Again something I didn&apos;t want to have to reinvent.
        </LibraryCard>
        <LibraryCard iconSource={nanoidImgSrc} title={'nanoid'}>
          For generating uuids for all of the models in the redux store.
        </LibraryCard>
      </div>
    </div>
  )
}

const LibraryCard = ({ iconSource, title, children }: React.PropsWithChildren<{ iconSource: string, title: string }>) => {
  return (
    <div className={styles["library-card"]}>
      <h3 className={styles["card-header"]}>
        <LibraryIcon src={iconSource} lib={title} />
        {title}
      </h3>
      {children}
    </div>
  )
}

const LibraryIcon = ({src, lib, size={width: '32px', height: '32px'}}: {src: string, lib: string, size?: { width?: string, height?: string }}) => {
  return (
    <img src={src} alt={`${lib} Icon`} style={size} className={styles['icon']} />
  )
}