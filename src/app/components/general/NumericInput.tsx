import React, { forwardRef } from 'react'

type Props = {
  ref?: React.RefObject<HTMLInputElement>
  onValueUpdate: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/display-name
export const NumericInput = forwardRef<HTMLInputElement, Props>(({ onValueUpdate, ...defaultInputProps }, ref) => {
  const handleInputChange = (value: string) => {
    const negative = value.startsWith('-')
    const sanitizedValue = value.replace(/[^\d.]+/g, '')

    onValueUpdate(negative ? `-${sanitizedValue}` : sanitizedValue)
  }

  return (
    <input
      {...defaultInputProps}
      ref={ref}
      onChange={(v) => handleInputChange(v.target.value)}
    />
  )
})