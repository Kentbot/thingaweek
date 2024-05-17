import React from 'react'

import styles from './styles.module.css'

export const LibraryCard = ({ iconSource, title, children }: React.PropsWithChildren<{ iconSource: string, title: string }>) => {
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

const LibraryIcon = ({src, lib}: {src: string, lib: string}) => {
  return (
    <img src={src} alt={`${lib} Icon`} className={styles['icon']} />
  )
}