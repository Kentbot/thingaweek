'use client'

import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthTransactions } from '@budget/store/selectors'

import { CategoryCreator } from './creationControls/categoryCreator/CategoryCreator'
import { GroupCreator } from './creationControls/groupCreator/GroupCreator'
import { MonthCarryover } from './creationControls/monthCarryover/MonthCarryover'
import { UngroupedCategories } from './groupDisplay/ungroupedCategories/UngroupedCategories'
import { GroupedCategories } from './groupDisplay/groupedCategories/GroupedCategories'

import './styles.scss'
import { CreationControls } from './creationControls/CreationControls'
import { IncomeView } from './income/IncomeView'

export default function CategoriesPage() {

  return (
    <>
      <CreationControls />
      <IncomeView />
      <UngroupedCategories />
      <GroupedCategories />
    </>
  )
}
