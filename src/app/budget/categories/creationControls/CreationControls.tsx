import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import { Modal } from '@/components/general/modal/Modal'

import { CategoryCreator } from './categoryCreator/CategoryCreator'
import { GroupCreator } from './groupCreator/GroupCreator'
import { MonthCarryover } from './monthCarryover/MonthCarryover'
import { IncomeCreator } from './incomeCreator/IncomeCreator'

import './creationControl.styles.scss'

export function CreationControls() {
  return (
    <div className="creation-controls">
      <Modal 
        toggleButtonIcon={<FontAwesomeIcon icon={faPencil} />}
        toggleButtonText="Category Management"
        title={'Category Management'}>
        <CategoryCreator />
        <IncomeCreator />
        <GroupCreator />
        <MonthCarryover />
      </Modal>
    </div>
  )
}