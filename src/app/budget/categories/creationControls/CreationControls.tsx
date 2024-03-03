import React, { useState } from 'react'

import { Dialog } from '@components/general/dialog/Dialog'

import { CategoryCreator } from './categoryCreator/CategoryCreator'
import { GroupCreator } from './groupCreator/GroupCreator'
import { MonthCarryover } from './monthCarryover/MonthCarryover'

import './creationCOntrol.styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { IncomeCreator } from './incomeCreator/IncomeCreator'

export function CreationControls() {
  const [open, setOpen] = useState(false)

  return (
    <div className="creation-controls">
      <button className="btn" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faPencil} /> Category Management
      </button>
      <Dialog isOpen={open} onClose={() => setOpen(false)} title={'Category Management'}>
        <MonthCarryover />
        <CategoryCreator />
        <IncomeCreator />
        <GroupCreator />
      </Dialog>
    </div>
  )
}