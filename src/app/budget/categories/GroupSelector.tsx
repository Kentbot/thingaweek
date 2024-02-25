import React from 'react'

import { CategoryGroup } from '@budget/models/categoryGroup.model'

type Props = {
  groups: CategoryGroup[]
  onGroupSelect: (groupId: string) => void
}

export function GroupSelector({ groups, onGroupSelect }: Props) {
  return (
    <select onChange={(event) => { onGroupSelect(event.target.value) }}>
      <option value={undefined}>-</option>
      { groups.map((group) => (
        <option key={group.id} value={group.id}>{group.name}</option>
      ))}
    </select>
  )
}