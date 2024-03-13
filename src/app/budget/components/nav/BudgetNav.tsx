import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faListUl, faMoneyBills, faSave } from '@fortawesome/free-solid-svg-icons'

// This has to be done because the blob for downloading the state JSON file differs
// on the server and client (breaking SSR). This defers the component to render only
// after the client has recieved the SSR markup from the server.
const Persister = dynamic(() => import('../persister/Persister'), {
  ssr: false,
  loading: () => <>Loading persistence buttons...<button disabled className="btn" style={{opacity: 0}}>load</button></>,
});

import { Modal } from '@components/general/modal/Modal'

import styles from './style.module.scss'

export function BudgetNav() {
  const pathname = usePathname()
 
  return (
    <div className={styles.budgetNav}>
      <nav>
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
      <Modal
        title="Save/Load Budget"
        toggleButtonIcon={<FontAwesomeIcon icon={faSave} />}
        toggleButtonText="Save/Load Budget">
        <Persister/>
      </Modal>
    </div>
  )
}