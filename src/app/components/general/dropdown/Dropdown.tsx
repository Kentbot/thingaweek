import React, { useEffect, useRef, useState } from 'react'

import './styles.scss'

type Option = {
  value: string
  display: string
  group?: string
}

type Props = {
  initialOption?: Option
  options: Option[]
  onSelect: (value: Option) => void
}

// TODO: Add option groups, work on selection/focus
export function Dropdown({
  initialOption,
  options,
  onSelect
}: Props) {
  const [active, setActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(initialOption)
  const optionRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    optionRefs.current.slice(0, options.length)
  }, [options])

  useEffect(() => {
    if (active) {
      const currentOption =
        optionRefs.current.find(optRef => selectedOption ? optRef?.value === selectedOption.value : false)

      if (currentOption) {
        currentOption.focus()
      }
    }
  }, [active, selectedOption])

  const handleDropdownClick = () => {
    setActive(!active)
  }

  const handleOptionClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const wasMouseClick = event.clientX !== 0 && event.clientY !== 0
    if (wasMouseClick) {
      setActive(false)
    }
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setActive(false)
    }
  }

  const handleChange = (option: Option) => {
    onSelect(option)
    setSelectedOption(option)
  }

  const handleBlur = (event: React.FocusEvent) => {
    // TODO: Come up with a good way to handle the user clicking outside of the dropdown
    // if (!event.currentTarget.contains(event.relatedTarget)) {
    //   setActive(false)
    // }
  }

  return (
    <div className={`custom-select ${active ? 'active' : ''}`} onBlur={handleBlur}>
      <button className="select-button" onClick={handleDropdownClick}>
        <span className="selected-value">{selectedOption?.display ?? '-'}</span>
        <span className="arrow"></span>
      </button>
      <ul className="select-dropdown" >
        {
          options.map((opt, i) => (
            <li
              key={opt.value}
              >
              <input
                ref={el => optionRefs.current[i] = el}
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