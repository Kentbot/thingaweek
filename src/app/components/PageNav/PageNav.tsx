import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './style.module.scss'

type ChildLink = {
  display: React.ReactNode
  href: string
  active: boolean
}

export function PageNav({ links, children: afterNavChildren }: React.PropsWithChildren<{ links: ChildLink[] }>) {
  const pathname = usePathname()
 
  return (
    <div className={styles['page-nav']}>
      <nav>
        {
          links.map((link) => 
            <Link
              key={link.href}
              className={`${styles.link} ${link.active ? `${styles.active}` : '' }`}
              href={link.href}
            >
              {link.display}
            </Link>
          )
        }
      </nav>
      {afterNavChildren}
    </div>
  )
}