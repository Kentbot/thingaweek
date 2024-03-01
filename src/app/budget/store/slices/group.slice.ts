import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

import { CategoryGroup } from '@budget/models/categoryGroup.model'
import { CategoryMonth } from '@budget/models/categoryMonth.model'

import { ISODateString } from '../types'
import { resetStateAction } from '../actions'
import { MonthLink } from '../models/monthLink.model'

export const initialState: CategoryGroup[] = []

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    createGroup(state, action: PayloadAction<CategoryGroup>) {
      state.push(action.payload)
    },
    createGroups(state, action: PayloadAction<CategoryGroup[]>) {
      state.push(...action.payload)
    },
    assignCategoryToGroup(state, action: PayloadAction<{ groupId: string, categoryId: string }>) {
      state.forEach(g => {
        if (g.id === action.payload.groupId) {
          g.categoryIds.push(action.payload.categoryId)
        }
      })
    },
    deleteGroup(state, action: PayloadAction<CategoryMonth>) {
      return state.filter(cat => cat.id !== action.payload.id)
    },
    carryoverGroups(state, action: PayloadAction<{ newMonth: ISODateString, categoryLinks: MonthLink[] }>) {
      const newMonthDateTime = DateTime.fromISO(action.payload.newMonth)
      const prevMonth = newMonthDateTime.plus({ months: -1 })

      const newGroups: CategoryGroup[] = []
      const previousGroupsToCarry = state
        .filter(g =>
          DateTime.fromISO(g.budgetMonth).month === prevMonth.month &&
          DateTime.fromISO(g.budgetMonth).year === prevMonth.year
          // && TODO: Use links like categories
          )

      previousGroupsToCarry.forEach(prev => {
        const newGroupId = nanoid()
        const newGroup: CategoryGroup = {
          ...prev,
          id: newGroupId,
          budgetMonth: action.payload.newMonth,
          categoryIds: [],
        }

        prev.categoryIds.forEach(prevCatId => {
          const newCategory = action.payload.categoryLinks.find(link => link.prevId === prevCatId)?.nextId
          if (newCategory) {
            newGroup.categoryIds.push(newCategory)
          } else {
            console.warn('Expected to find a linked category, but none existed.' +
              'Did something happen while carrying over categories from the previous month?')
          }
        })

        newGroups.push(newGroup)
      })

      state.push(...newGroups)
    }
  },
  extraReducers: (builder) =>
    builder.addCase(resetStateAction, () => initialState)
})

export const {
  createGroup,
  createGroups,
  assignCategoryToGroup,
  deleteGroup,
  carryoverGroups
} = groupSlice.actions
export default groupSlice.reducer