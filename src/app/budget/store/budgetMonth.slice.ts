import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import { ISODateString } from "./types"

const initialState: ISODateString = DateTime.now().toISODate()

const budgetMonthSlice = createSlice({
  name: 'budgetMonth',
  initialState,
  reducers: {
    changeMonth(state, action: PayloadAction<ISODateString>) {
      return action.payload
    },
  },
})

export const { changeMonth } = budgetMonthSlice.actions
export default budgetMonthSlice.reducer