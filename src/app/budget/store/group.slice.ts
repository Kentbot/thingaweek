import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { CategoryGroup } from "@budget/models/categoryGroup.model"
import { CategoryMonth } from "@budget/models/categoryMonth.model"
import { carryoverMonthAction } from "./actions"
import { DateTime } from "luxon"

const initialState: CategoryGroup[] = []

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    createGroup(state, action: PayloadAction<CategoryGroup>) {
      state.push(action.payload)
    },
    assignCategoryToGroup(state, action: PayloadAction<{ groupId: string, categoryId: string }>) {
      
    },
    deleteGroup(state, action: PayloadAction<CategoryMonth>) {
      return state.filter(cat => cat.id !== action.payload.id)
    },
    carryoverGroups(state, action: PayloadAction<{ newMonth: DateTime, newCategories: CategoryMonth[] }>) {

    }
  },
  extraReducers(builder) {
    builder.addCase(carryoverMonthAction, (state) => {})
  }
})

export const {
  createGroup,
  assignCategoryToGroup,
  deleteGroup,
  carryoverGroups
} = groupSlice.actions
export default groupSlice.reducer