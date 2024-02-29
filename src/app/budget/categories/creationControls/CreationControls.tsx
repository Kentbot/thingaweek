import React from 'react'

import { CategoryCreator } from './categoryCreator/CategoryCreator'
import { GroupCreator } from './groupCreator/GroupCreator'
import { MonthCarryover } from './monthCarryover/MonthCarryover'

import './creationCOntrol.styles.scss'

export function CreationControls() {
  return (
    <div className="creation-controls">
      <CategoryCreator />
      <GroupCreator />
      <MonthCarryover />
    </div>
  )
}