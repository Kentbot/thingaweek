'use client'

import React from 'react'

import './nav.style.scss'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav() {
  const pathname = usePathname()
 
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <Link
              className={`link ${pathname === '/' ? 'active' : ''}`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`link ${pathname.startsWith('/budget') ? 'active' : ''}`}
              href="/budget"
            >
              Budget
            </Link>
          </li>
          <li>
            <Link
              className={`link ${pathname === '/about' ? 'active' : ''}`}
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`link ${pathname === '/blog' ? 'active' : ''}`}
              href="/blog"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <div className="nav-spacer"></div>
    </>
  )
}