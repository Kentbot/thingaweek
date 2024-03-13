import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

type Props = React.PropsWithChildren<{
  title?: string
  toggleButtonText?: string
  toggleButtonIcon?: React.ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}>

export function Modal({ children, title, toggleButtonText, toggleButtonIcon, isOpen, onOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(isOpen ?? false)

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (dialogElement) {
      if (isModalOpen) {
        dialogElement.showModal()
        onOpen ? onOpen() : null
      } else {
        dialogElement.close()
      }
    }
  }, [isModalOpen, onOpen])

  useEffect(() => {
    console.log('is open?', isOpen)
    if (isOpen !== undefined) {
      setIsModalOpen(isOpen)
    }
  }, [isOpen])

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
        {toggleButtonIcon}{toggleButtonText ? <>&nbsp;{toggleButtonText}</> : null}
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