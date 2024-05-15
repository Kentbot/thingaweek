'use client'
import React from 'react'

import styles from './styles.module.css'

const currencyJsImgSrc = 'https://user-images.githubusercontent.com/1062039/31397824-9dfa15f0-adac-11e7-9869-fb20746e90c1.png'
const luxonImgSrc = 'https://moment.github.io/luxon/docs/_media/Luxon_icon_64x64.png'
const papaparseImgSrc = 'https://www.papaparse.com/favicon.ico'
const nanoidImgSrc = 'https://camo.githubusercontent.com/1217981e015858c201536e6f7822e1fc30ab66c4060462da9e80f65e701893bd/68747470733a2f2f61692e6769746875622e696f2f6e616e6f69642f6c6f676f2e737667'

export default function Budget() {
  return (
    <div className="budget">
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
        <ul className={styles['lib-list']}>
          <li className={styles['list-item']}>
            <LibraryIcon src={luxonImgSrc} lib='luxon'/>
            <span className={styles['description']}>
              Luxon - For its ability to convert and keep track of times. Once the Temporal API is
              finalized and adopted by browsers I will probably drop this dependency.
            </span>
          </li>
          <li className={styles['list-item']}>
            <LibraryIcon src={currencyJsImgSrc} lib='currency.js'/>
            <span className={styles['description']}>
              currency.js - I didn&apos;t want to get bogged down handling floating point nastiness with
              a budgeting application, and currency.js allows me to just add two currencies together
              and know that the math will work. (Of course I still have tests for the actual math 
              being done, e.g. tests for the calculation of a current month&apos;s balance)
            </span>
          </li>
          <li className={styles['list-item']}>
            <LibraryIcon src={papaparseImgSrc} lib='papaparse'/>
            <span className={styles['description']}>
              papaparse - For parsing CSV transaction data. Again something I didn&apos;t want to have to reinvent.
            </span>
          </li>
          <li className={styles['list-item']}>
            <LibraryIcon src={nanoidImgSrc} lib='nanoid' size={{ height: '24px', width: '32px' }}/>
            <span className={styles['description']}>
              nanoid - For generating uuids for all of my models in the redux store.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const LibraryIcon = ({src, lib, size={width: '32px', height: '32px'}}: {src: string, lib: string, size?: { width?: string, height?: string }}) => {
  return (
    <img src={src} alt={`${lib} Icon`} style={size} className={styles['icon']} />
  )
}