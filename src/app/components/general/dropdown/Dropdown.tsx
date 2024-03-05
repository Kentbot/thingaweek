import React, { forwardRef, useEffect, useRef, useState } from 'react'

import { nanoid } from 'nanoid'

import './styles.scss'

export type DropdownOption = {
  value: string
  display: string
  group?: string
}

type ReturnedOption = Omit<DropdownOption, 'value'> & {
  value?: string
}

type GroupedOptions = {
  [key: string]: DropdownOption[]
}

type Props = {
  initialOption?: DropdownOption
  options: DropdownOption[]
  onSelect: (option: Partial<DropdownOption>) => void
}

const defaultOption: ReturnedOption = {
  display: '-',
  value: undefined,
}

// TODO: Work on selection/focus
export function Dropdown({
  initialOption,
  options,
  onSelect
}: Props) {
  const [active, setActive] = useState(false)
  // The currently selected option, but can be reverted by the user if they hit escape
  const [selectedOption, setSelectedOption] = useState(initialOption ?? defaultOption)
  // The option the user has actually confirmed by clicking/hitting 'enter'
  const [confirmedOption, setConfirmedOption] = useState(initialOption ?? defaultOption)
  
  const [groupedOptions, setGroupedOptions] = useState<GroupedOptions>({})
  const [ungroupedOptions, setUngroupedOptions] = useState<DropdownOption[]>([])

  const optionRefs = useRef<(HTMLInputElement | null)[]>([])
  const dropdownRef = useRef<HTMLUListElement>(null)
  
  useEffect(() => {
    const newGroupedOptions: GroupedOptions = {}
    const newUngroupedOptions: DropdownOption[] = []

    options.forEach(opt => {
      if (opt.group) {
        if (!newGroupedOptions[opt.group]) {
          newGroupedOptions[opt.group] = []
        }
        newGroupedOptions[opt.group].push(opt)
      } else {
        newUngroupedOptions.push(opt)
      }
    })

    setGroupedOptions(newGroupedOptions)
    setUngroupedOptions(newUngroupedOptions)

  }, [options])

  useEffect(() => {
    optionRefs.current.slice(0, options.length)
  }, [options])

  useEffect(() => {
    if (active) {
      const currentOption =
        optionRefs.current.find(optRef => confirmedOption ? optRef?.value === confirmedOption.value : false)

      if (currentOption) {
        currentOption.focus()
      }
    }
  }, [active, confirmedOption])

  useEffect(() => {
    if (dropdownRef.current) {
      const rectResult = dropdownRef.current.getBoundingClientRect()

      const rightOverrun = rectResult.width + rectResult.x > window.innerWidth
      const leftOverrun = rectResult.x < 0
      const bottomOverrun = rectResult.height + rectResult.y > window.innerHeight
      const topOverrun = rectResult.y < 0

      if (rightOverrun) { dropdownRef.current.className += ' pin-right' }
      if (leftOverrun) { dropdownRef.current.className += ' pin-left' }
      if (bottomOverrun) { dropdownRef.current.className += ' pin-bottom' }
      if (topOverrun) { dropdownRef.current.className += ' pin-top' }
    }
  }, [dropdownRef])

  const handleDropdownClick = () => {
    setActive(!active)
  }

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>, option: ReturnedOption) => {
    event.preventDefault()
    const wasMouseClick = event.clientX !== 0 && event.clientY !== 0
    if (wasMouseClick) {
      // This needs the option directly because it fires before the onChange event, which means
      // it would be one step behind the "current" selected option
      handleConfirmOption(option || { display: 'Error', value: 'Error' })
      setActive(false)
    }
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': 
        setActive(false)
        handleConfirmOption(selectedOption || { display: 'Error', value: 'Error' })
        break
      case 'Escape':
        setActive(false)
        break
    }
  }

  const handleConfirmOption = (option: ReturnedOption) => {
    setConfirmedOption(option)
    onSelect(option)
  }

  const handleChange = (option: ReturnedOption) => {
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
        <span className="selected-value">{confirmedOption?.display ?? '-'}</span>
        <span className="arrow"></span>
      </button>
      <ul className="select-dropdown" ref={dropdownRef}>
        <DefaultOption
          option={defaultOption}
          onKeydown={handleKeydown}
          onOptionClick={handleOptionClick}
          onChange={() => handleChange(defaultOption)}
        />
        {
          ungroupedOptions.map((opt, i) => (
            <React.Fragment key={opt.value}>
              <DropdownOption
                ref={el => optionRefs.current[i] = el}
                option={opt}
                onKeydown={handleKeydown}
                onOptionClick={handleOptionClick}
                onChange={() => handleChange(opt)}
              />
            </React.Fragment>
          ))
        }
        {
          Object.keys(groupedOptions).map((group) => {
            const groupOpts = groupedOptions[group]

            return (
              <React.Fragment key={group}>
                <div className="group-divider">
                  <div className="label">{groupOpts[0].group}</div><hr/>
                </div>
                <div className="option-group">
                  {
                    groupOpts.map((opt, i) => (
                      <React.Fragment key={opt.value}>
                        <DropdownOption
                          ref={el => optionRefs.current[i] = el}
                          option={opt}
                          onKeydown={handleKeydown}
                          onOptionClick={handleOptionClick}
                          onChange={() => handleChange(opt)}
                        />
                      </React.Fragment>))
                  }
                </div>
              </React.Fragment>
            )
          })
        }
      </ul>
    </div>
  )
}

type OptionProps = {
  option: DropdownOption
  onKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onOptionClick: (event: React.MouseEvent<HTMLElement>, option: ReturnedOption) => void
  onChange: (option: ReturnedOption) => void
}

const DropdownOption = forwardRef<HTMLInputElement, OptionProps>(
  function DropdownOption({ option, onKeydown, onOptionClick, onChange }, ref) {
    const optionId = nanoid()
    return (
      <li>
        <input
          ref={ref}
          type="radio"
          id={optionId}
          name="dropdown-values"
          value={option.value}
          onKeyDown={onKeydown}
          onClick={(event) => onOptionClick(event, option)}
          onChange={() => onChange(option)}/>
        <label htmlFor={optionId}>{option.display}</label>
      </li>
    )
})

type DefaultOptionProps = Omit<OptionProps, 'option'> & {
  option: ReturnedOption
}

function DefaultOption({ option, onKeydown, onOptionClick, onChange }: DefaultOptionProps) {
  return (
    <li>
      <input
        type="radio"
        id="default"
        name="dropdown-values"
        value={undefined}
        onKeyDown={onKeydown}
        onClick={(event) => onOptionClick(event, option)}
        onChange={() => onChange(option)}/>
      <label htmlFor={"default"}>{option.display}</label>
    </li>
  )
}