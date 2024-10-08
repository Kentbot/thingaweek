import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

type Props = React.PropsWithChildren<{
  title?: string | React.ReactNode
  buttonStyle?: React.CSSProperties
  toggleButtonText?: string
  toggleButtonIcon?: React.ReactNode
  displayCloseButton?: boolean
  isOpen?: boolean
  responsiveBtnText?: boolean
  onOpen?: () => void
  onClose?: () => void
}>

export function Modal({
  children,
  title,
  buttonStyle,
  toggleButtonText,
  toggleButtonIcon,
  displayCloseButton,
  isOpen,
  responsiveBtnText,
  onOpen,
  onClose
}: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(isOpen ?? false)

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (dialogElement) {
      isModalOpen ?
        dialogElement.showModal() :
        dialogElement.close()
    }
  }, [isModalOpen])

  useEffect(() => {
    setIsModalOpen(isOpen ?? false)
  }, [isOpen])

  /**
   * Assumes the button can only be clicked when the modal is closed.
   * If that changes make sure to modify this.
   */
  const handleModalOpen = () => {
    if (onOpen) {
      onOpen()
    }
    setIsModalOpen(true)
  }

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
      <button className="btn" onClick={handleModalOpen} style={buttonStyle}>
        {toggleButtonIcon}
        <span className={responsiveBtnText ? styles["responsive-btn-text"] : ""}>
          {toggleButtonText ? <>&nbsp;{toggleButtonText}</> : null}
        </span>
      </button>
      <dialog ref={dialogRef} className={styles.modal} onKeyDown={handleKeyDown}>
        { title && <div className={styles.title}>{title}</div> }
        { (displayCloseButton === true) || (displayCloseButton === undefined)  &&
        <button className={`${styles["close-btn"]} btn`} onClick={handleModalClose}>
          &times;
        </button> }
        {children}
      </dialog>
    </>
  )
}