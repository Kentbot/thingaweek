import React, { createContext, useContext } from 'react'

import { useImmerReducer } from 'use-immer'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

import { BudgetMonth } from '@budget/models/budgetMonth.model'
import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { Transaction } from '@budget/models/transaction.model'
import { PayloadAction } from './models'

const BudgetMonthsContext = createContext<BudgetMonth[]>([])
const BudgetMonthsDispatchContext = createContext<React.Dispatch<BudgetMonthAction>>(() => {})

export const useBudgetMonths: () => [ BudgetMonth[], React.Dispatch<BudgetMonthAction> ] = () => [
  useContext(BudgetMonthsContext), useContext(BudgetMonthsDispatchContext)
]

const defaultState: BudgetMonth[] = [
  {
    id: nanoid(),
    month: DateTime.now(),
    active: true,
    categories: [],
    groups: [],
    transactions: []
  }
]

export function StoreProvider({ children }: React.PropsWithChildren) {
  const [budgetMonths, dispatch] = useImmerReducer<BudgetMonth[], BudgetMonthAction>(budgetMonthReducer, defaultState)

  return (
    <BudgetMonthsContext.Provider value={budgetMonths}>
      <BudgetMonthsDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetMonthsDispatchContext.Provider>
    </BudgetMonthsContext.Provider>
  )
}

const budgetMonthReducer = (state: BudgetMonthState, action: BudgetMonthAction) => {
  switch (action.type) {
    case 'change-month':
      const newMonthDate = action.payload.newMonthDate 
      const newMonth = newMonthDate.month
      const newYear = newMonthDate.year
      const existingNewMonth = state.find(m =>
        m.month.month === newMonth &&
        m.month.year === newYear)

      if (!existingNewMonth) {
        state.forEach(m => m.active = false)
        state.push({ id: nanoid(), active: true, categories: [], groups: [], transactions: [], month: newMonthDate })
      } else {
        state.forEach(oldBudgetMonth => {
          oldBudgetMonth.active =
            oldBudgetMonth.month.year === newYear &&
            oldBudgetMonth.month.month === newMonth
        })
      }
      break;  
    case 'create-category':
      break;
    case 'update-category':
      break;
    case 'delete-category':
      break;
    case 'add-cat-to-group':
      break;
    case 'add-trans-to-cat':
      break;
    case 'create-transaction':
      break;
    case 'delete-transaction':
      break;
  }

  return state
}

const actionTypes = {
  changeMonth: 'change-month',
  createCategory: 'create-category',
  updateCategory: 'update-category',
  deleteCategory: 'delete-category',
  addTransToCat: 'add-trans-to-cat',
  addCatToGroup: 'add-cat-to-group',
  createTransaction: 'create-transaction',
  deleteTransaction: 'delete-transaction'
} as const

export const changeMonth = (newMonth: DateTime): ChangeMonthAction =>
  ({ type: actionTypes.changeMonth, payload: { newMonthDate: newMonth } })
export const createCategory = (category: CategoryMonth): CreateCategoryAction =>
  ({ type: actionTypes.createCategory, payload: { category } })
export const updateCategory = (category: CategoryMonth): UpdateCategoryAction =>
  ({ type: actionTypes.updateCategory, payload: { category } })
export const deleteCategory = (categoryId: string): DeleteCategoryAction =>
  ({ type: actionTypes.deleteCategory, payload: { categoryId } })
export const addCategoryToGroup = (categoryId: string, groupId: string): AddCategoryToGroupAction =>
  ({ type: actionTypes.addCatToGroup, payload: { categoryId, groupId } })
export const addTransactionToCategory = (categoryId: string, transactionId: string): AddTransactionToCategoryAction =>
  ({ type: actionTypes.addTransToCat, payload: { categoryId, transactionId } })
export const createTransaction = (transaction: Transaction): CreateTransactionAction =>
  ({ type: actionTypes.createTransaction, payload: { transaction } })
export const deleteTransaction = (transactionId: string): DeleteTransactionAction =>
  ({ type: actionTypes.deleteTransaction, payload: { transactionId } })

type BudgetMonthState = BudgetMonth[]
type ChangeMonthAction = PayloadAction<typeof actionTypes.changeMonth, { newMonthDate: DateTime }>
type MonthAction =
  ChangeMonthAction

type CreateCategoryAction = PayloadAction<typeof actionTypes.createCategory, { category: CategoryMonth }>
type UpdateCategoryAction = PayloadAction<typeof actionTypes.updateCategory, { category: CategoryMonth }>
type DeleteCategoryAction = PayloadAction<typeof actionTypes.deleteCategory, { categoryId: string }>
type AddTransactionToCategoryAction = PayloadAction<typeof actionTypes.addTransToCat, { categoryId: string, transactionId: string }>
type AddCategoryToGroupAction = PayloadAction<typeof actionTypes.addCatToGroup, { categoryId: string, groupId: string }>
type CategoryAction =
  CreateCategoryAction | UpdateCategoryAction | DeleteCategoryAction |
  AddTransactionToCategoryAction | AddCategoryToGroupAction

type CreateTransactionAction = PayloadAction<typeof actionTypes.createTransaction, { transaction: Transaction }>
type DeleteTransactionAction = PayloadAction<typeof actionTypes.deleteTransaction, { transactionId: string }>
type TransactionAction =
  CreateTransactionAction | DeleteTransactionAction

type BudgetMonthAction = MonthAction | CategoryAction | TransactionAction