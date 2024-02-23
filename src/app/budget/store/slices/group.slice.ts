import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

import { CategoryGroup } from '@budget/models/categoryGroup.model'
import { CategoryMonth } from '@budget/models/categoryMonth.model'

import { ISODateString } from '../types'
import { resetStateAction } from '../actions'

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
    carryoverGroups(state, action: PayloadAction<{ newMonth: ISODateString, newCategories: CategoryMonth[] }>) {
      const newMonthDateTime = DateTime.fromISO(action.payload.newMonth)
      const prevMonth = newMonthDateTime.plus({ months: -1 })

      const newGroups: CategoryGroup[] = state
        .filter(g => 
          DateTime.fromISO(g.budgetMonth).month === prevMonth.month &&
          DateTime.fromISO(g.budgetMonth).year === prevMonth.year)
        .map(g => ({
          ...g,
          // id: nanoid(), // Don't create a new id yet, we can use this to grab the old group's categories
          budgetMonth: action.payload.newMonth,
          categoryIds: [],
        }))

      newGroups.forEach(newGroup => {
        const prevGroup = state.find(stateGroup => stateGroup.id === newGroup.id)
        newGroup.categoryIds = action.payload.newCategories
          .filter(newCategory => prevGroup?.categoryIds.includes(newCategory.prevMonthId ?? ''))
          .map(newCategory => newCategory.id)
        
        // Now that we've used the previous group to get the categories, we can give this new category an id
        newGroup.id = nanoid()
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