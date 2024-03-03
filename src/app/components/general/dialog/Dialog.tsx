import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

type Props = React.PropsWithChildren<{
  title?: string
  isOpen?: boolean
  onClose?: () => void
}>

export function Dialog({ children, title, isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(isOpen)

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (dialogElement) {
      isModalOpen ?
        dialogElement.showModal() :
        dialogElement.close()
    }
  }, [isModalOpen])

  const handleModalClose = () => {
    if (onClose) {
      onClose()
    }
    setIsModalOpen(false)
  }
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleModalClose()
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.modal} onKeyDown={handleKeyDown}>
      { !!title && <div className={styles.title}>{title}</div> }
      <button className={`${styles["close-btn"]} btn`} onClick={handleModalClose}>
        &times;
      </button>
      {children}
    </dialog>
  )
}