import React from 'react'

import styles from './styles.module.css'

// Copied from the Vue docs webpage
export function VueIcon() {
  return (
    <svg className={styles["vue-icon-svg"]} viewBox="0 0 128 128">
      <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" />
      <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" />
    </svg>
  )
}