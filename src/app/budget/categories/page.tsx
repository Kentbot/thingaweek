'use client'

import React from 'react'

import { UngroupedCategories } from './expenseCategory/ungrouped/UngroupedCategories'
import { GroupedCategories } from './expenseCategory/grouped/GroupedCategories'
import { CreationControls } from './creationControls/CreationControls'
import { IncomeView } from './income/IncomeView'

import './styles.scss'

export default function CategoriesPage() {

  return (
    <>
      <CreationControls />
      <UngroupedCategories />
      <div className="all-categories">
        <IncomeView />
        <GroupedCategories />
      </div>
    </>
  )
}
