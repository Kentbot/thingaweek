import React, { useState } from 'react'

import './styles.scss'

type Option = {
  value: string
  display: string
}

type Props = {
  initialOption?: Option
  options: Option[]
  onSelect: (value: string) => void
}

// TODO: Add option groups, work on selection/focus
export function Dropdown({
  initialOption,
  options,
  onSelect
}: Props) {
  const [active, setActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(initialOption)

  const handleDropdownClick = () => {
    setActive(!active)
  }

  const handleOptionClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log('click', event)
    setActive(false)
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key', event.key)
    if (event.key === 'Enter') {
      setActive(false)
    }
  }

  const handleChange = (option: Option) => {
    console.log('change')
    onSelect(option.value)
  }

  return (
    <div className={`custom-select ${active ? 'active' : ''}`}>
      <button className="select-button" onClick={handleDropdownClick}>
        <span className="selected-value">{selectedOption?.display ?? '-'}</span>
        <span className="arrow"></span>
      </button>
      <ul className="select-dropdown" onFocus={() => console.log('focus')} onBlur={() => console.log('blur')}>
        {
          options.map(opt => (
            <li key={opt.value}>
              <input
                type="radio"
                id={opt.value}
                name="dropdown-values"
                value={opt.value}
                onKeyDown={handleKeydown}
                onClick={handleOptionClick}
                onChange={() => handleChange(opt)}/>
              <label htmlFor={opt.value}>{opt.display}</label>
            </li>
          ))
        }
      </ul>
    </div>
  )
}