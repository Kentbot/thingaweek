import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import currency from 'currency.js'

import { AppDispatch } from '@/budget/store/store'
import { updateExpenseCategory } from '@/budget/store/slices/expenseCategory.slice'

import { ExpenseCategory } from '@/budget/models/expenseCategory.model'

import { Validator } from '@/budget/services/category.service'

import { Modal } from '@/components/general/modal/Modal'
import { NumericInput } from '@/components/general/NumericInput'
import { CategoryTransactionView } from './CategoryTransactionView'
import { CategoryEditor } from './CategoryEditor'

import './styles.scss'

type Props = {
  expenseCategory: ExpenseCategory
  balanceForward: string
  editModalOpen: boolean
  onOpen: () => void
  onCancel: () => void
  onEditConfirm: () => void
}

export function ManageCategoryModal({
  expenseCategory,
  balanceForward,
  editModalOpen,
  onOpen,
  onCancel,
  onEditConfirm
}: Props) {
  return (
    <Modal
      toggleButtonIcon={<FontAwesomeIcon icon={faEllipsis} />}
      title={<div>Manage Expense Category - {expenseCategory.name}</div>}
      isOpen={editModalOpen}
      onOpen={onOpen}
      buttonStyle={{ width: '24px', padding: '0', justifySelf: 'center' }}
    >
      <CategoryEditor
        expenseCategory={expenseCategory}
        balanceForward={balanceForward}
        onCancel={onCancel}
        onEditConfirm={onEditConfirm}
      />
      <CategoryTransactionView category={expenseCategory} />
    </Modal>
  )
}