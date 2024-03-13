import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { createGroup } from '@budget/store/slices/group.slice'
import { RootState } from '@budget/store/store'

import './styles.scss'
import { Tooltip } from '@components/general/tooltip/Tooltip'

export function GroupCreator() {
  const dispatch = useDispatch()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)
  
  const [groupName, setGroupName] = useState('')
  const [nameIsValid, setNameIsValid] = useState(true)

  const handleNameChange = (value: string) => {
    if (!nameIsValid) {
      setNameIsValid(validateName(value))
    }
    setGroupName(value)
  }

  const validateName = (name: string) => {
    return name.length > 0
  }

  const handleGroupCreate = () => {
    const isValidName = validateName(groupName)
    setNameIsValid(isValidName)

    if (!isValidName) {
      return
    }

    dispatch(createGroup({
      id: nanoid(),
      name: groupName,
      categoryIds: [],
      budgetMonth: currentMonth,
      linkedGroups: {}
    }))
    setGroupName('')
  }

  return (
    <div className="creation-group">
      <div className="label">Create New Group <Tooltip onClick={() => alert('TODO Group')}/></div>
      <input
        id='group-name-input'
        className={`category-input ${!nameIsValid ? 'invalid' : ''}`}
        type='text'
        placeholder='Category Group name'
        value={groupName}
        onChange={(v) => handleNameChange(v.target.value)}
      />
      <button className="btn" onClick={handleGroupCreate}>
        Create Group
      </button>
    </div>
  )
}