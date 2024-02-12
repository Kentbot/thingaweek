import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

const initialState: DateTime = DateTime.now()

const budgetMonthSlice = createSlice({
  name: 'budgetMonth',
  initialState,
  reducers: {
    changeMonth(state, action: PayloadAction<DateTime>) {
      state = action.payload
    },
  },
})

export const { changeMonth } = budgetMonthSlice.actions
export default budgetMonthSlice.reducer