import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

import { CategoryGroup } from '@/budget/models/categoryGroup.model'

import { ISODateString } from '../types'
import { resetStateAction } from '../actions'
import { filterToBudgetMonth } from '@/budget/services/category.service'

type CategoryState = CategoryGroup[]

export const initialState: CategoryState = []

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
    deleteGroup(state, action: PayloadAction<{ groupId: string }>) {
      return state.filter(group => group.id !== action.payload.groupId)
    },
    carryoverGroups(state, action: PayloadAction<{ newMonth: ISODateString }>) {
      const newMonthDateTime = DateTime.fromISO(action.payload.newMonth)
      const prevMonth = newMonthDateTime.plus({ months: -1 })

      const newGroups: CategoryGroup[] = []
      const previousGroupsToCarry = filterToBudgetMonth(state, prevMonth)
        .filter(g => g.linkedGroups.nextId === undefined)

      previousGroupsToCarry.forEach(prevGroup => {
        const newGroupId = nanoid()
        const newGroup: CategoryGroup = {
          ...prevGroup,
          id: newGroupId,
          budgetMonth: action.payload.newMonth,
          categoryIds: [],
          linkedGroups: { prevId: prevGroup.id }
        }

        prevGroup.linkedGroups.nextId = newGroupId

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