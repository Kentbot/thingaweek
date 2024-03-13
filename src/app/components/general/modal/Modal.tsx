import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

type Props = React.PropsWithChildren<{
  title?: string
  toggleButtonText?: string
  toggleButtonIcon?: React.ReactNode
  onClose?: () => void
}>

export function Modal({ children, title, toggleButtonText, toggleButtonIcon, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      <button className="btn" onClick={() => setIsModalOpen(!isModalOpen)}>
        {toggleButtonIcon} {toggleButtonText ?? "Toggle modal"}
      </button>
      <dialog ref={dialogRef} className={styles.modal} onKeyDown={handleKeyDown}>
        { !!title && <div className={styles.title}>{title}</div> }
        <button className={`${styles["close-btn"]} btn`} onClick={handleModalClose}>
          &times;
        </button>
        {children}
      </dialog>
    </>
  )
}