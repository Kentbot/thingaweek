import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { createGroup } from '@budget/store/slices/group.slice'
import { RootState } from '@budget/store/store'

import './styles.scss'

export function GroupCreator() {
  const dispatch = useDispatch()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)
  
  const [groupName, setGroupName] = useState('')

  const handleGroupCreate = () => {
    dispatch(createGroup({
      id: nanoid(),
      name: groupName,
      categoryIds: [],
      budgetMonth: currentMonth
    }))
    setGroupName('')
  }

  return (
    <>
      <input
        id='group-name-input'
        className='category-input gap-left'
        type='text'
        placeholder='Category Group name'
        value={groupName}
        onChange={(v) => setGroupName(v.target.value)}
      />
      <button className="btn" onClick={handleGroupCreate}>
        Create Group
      </button>
    </>
  )
}