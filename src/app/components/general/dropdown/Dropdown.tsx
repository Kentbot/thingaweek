import React from 'react'

import './styles.scss'

type Props = {
  defaultOption?: string
  options: { value: string, display: string }[]
  onSelect: (value: string) => void
}

// TODO: Make this a beautiful dropdown
export function Dropdown({
  defaultOption,
  options,
  onSelect
}: Props) {
  return (
    <select onChange={(event) => onSelect(event.target.value)}>
      <option value={undefined}>{defaultOption ?? '-'}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.display}</option>
      ))}
    </select>
  )
}