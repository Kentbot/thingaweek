import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './style.module.scss'

export function BudgetNav() {
  const pathname = usePathname()
 
  return (
    <nav className={styles.budgetNav}>
      <ul>
        <li>
          <Link
            className={`link ${pathname === '/budget' ? 'active' : ''}`}
            href="/budget"
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname.endsWith('/categories') ? 'active' : ''}`}
            href="/budget/categories"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname.endsWith('/transactions') ? 'active' : ''}`}
            href="/budget/transactions"
          >
            Transactions
          </Link>
        </li>
      </ul>
    </nav>
  )
}