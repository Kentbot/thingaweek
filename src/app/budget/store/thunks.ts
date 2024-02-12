import { createAsyncThunk } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

import { carryoverMonthAction } from "./actions";
import { AppDispatch, RootState } from "./store";
import { carryoverCategories } from "./category.slice";
import { carryoverGroups } from "./group.slice";

type ThunkReturn = void
type ThunkArgs = DateTime
type ThunkApi = { state: RootState, dispatch: AppDispatch }
export const carryoverMonth = createAsyncThunk<
  ThunkReturn,
  ThunkArgs,
  ThunkApi>(
  carryoverMonthAction.type,
  (newMonth, thunk) => {
    thunk.dispatch(carryoverCategories(newMonth))
    const newCategories = thunk.getState().categories.filter(c =>
      c.budgetMonth.month === newMonth.month &&
      c.budgetMonth.year === newMonth.year)
    thunk.dispatch(carryoverGroups({ newMonth, newCategories }))
  }
)