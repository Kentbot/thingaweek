import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faListUl, faMoneyBillTransfer, faMoneyBills } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.scss'

export function BudgetNav() {
  const pathname = usePathname()
 
  return (
    <nav className={styles.budgetNav}>
      <Link
        className={`${styles.link} ${pathname === '/budget' ? `${styles.active}` : ''}`}
        href="/budget"
      >
        <FontAwesomeIcon icon={faChartLine} /> Overview
      </Link>
      <Link
        
        className={`${styles.link} ${pathname.endsWith('/categories') ? `${styles.active}` : ''}`}
        href="/budget/categories"
      >
        <FontAwesomeIcon icon={faListUl} /> Categories
      </Link>
      <Link
        className={`${styles.link} ${pathname.endsWith('/transactions') ? `${styles.active}` : ''}`}
        href="/budget/transactions"
      >
        <FontAwesomeIcon icon={faMoneyBills} /> Transactions
      </Link>
    </nav>
  )
}