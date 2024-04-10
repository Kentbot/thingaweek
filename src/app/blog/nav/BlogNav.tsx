import React from 'react'

import { usePathname } from 'next/navigation'

import { PageNav } from '@/components/PageNav/PageNav'

export function BlogNav() {
  const pathname = usePathname()
 
  return (
    <PageNav
      links={[
        {
          href: '/blog',
          active: true,
          display: <>Overview</>
        },
        {
          href: '/blog/article-one',
          active: false,
          display: <>Don&#39;t click, doesn&#39;t exist</>
        }
      ]}
    />
  )
}