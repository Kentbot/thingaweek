import React, { forwardRef, useEffect, useRef, useState } from 'react'

import './styles.scss'

type Option = {
  value: string
  display: string
  group?: string
}

type GroupedOptions = {
  [key: string]: Option[]
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
  // The currently selected option, but can be reverted by the user if they hit escape
  const [selectedOption, setSelectedOption] = useState(initialOption)
  // The option the user has actually confirmed by clicking/hitting 'enter'
  const [confirmedOption, setConfirmedOption] = useState(initialOption)
  
  const [groupedOptions, setGroupedOptions] = useState<GroupedOptions>({})
  const [ungroupedOptions, setUngroupedOptions] = useState<Option[]>([])

  const optionRefs = useRef<(HTMLInputElement | null)[]>([])
  
  useEffect(() => {
    const newGroupedOptions: GroupedOptions = {}
    const newUngroupedOptions: Option[] = []

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

  const handleDropdownClick = () => {
    setActive(!active)
  }

  const handleOptionClick = (event: React.MouseEvent<HTMLInputElement>, option: Option) => {
    console.log('click')
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

  const handleConfirmOption = (option: Option) => {
    setConfirmedOption(option)
    onSelect(option)
  }

  const handleChange = (option: Option) => {
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
      <ul className="select-dropdown" >
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
  option: Option
  onKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onOptionClick: (event: React.MouseEvent<HTMLInputElement>, option: Option) => void
  onChange: (option: Option) => void
}

const DropdownOption = forwardRef<HTMLInputElement, OptionProps>(
  function DropdownOption({ option, onKeydown, onOptionClick, onChange }, ref) {
  return (
    <li>
      <input
        ref={ref}
        type="radio"
        id={option.value}
        name="dropdown-values"
        value={option.value}
        onKeyDown={onKeydown}
        onClick={(event) => onOptionClick(event, option)}
        onChange={() => onChange(option)}/>
      <label htmlFor={option.value}>{option.display}</label>
    </li>
  )
})