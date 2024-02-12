import { createAction } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

export const carryoverMonthAction = createAction<DateTime>('month-carryover')