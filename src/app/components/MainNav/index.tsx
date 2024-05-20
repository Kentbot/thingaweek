'use client'

import React, { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose'

import './nav.style.scss'

export function Nav() {
  const [showMenu, setShowMenu] = useState(false)

  const pathname = usePathname()

  const toggleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1100) {
      setShowMenu(false)
    }
  }
 
  return (
    <>
      <nav className="nav">
        <div className="title">KM Codes</div>
        <div className={`background-blur ${showMenu ? 'show' : ''}`} />
        <div className={`links ${showMenu ? 'show' : ''}`}>
          <Link
            className={`link ${pathname === '/' ? 'active' : ''}`}
            href="/"
            onClick={closeMenuOnMobile}
          >
            Home
          </Link>
          <Link
            className={`link ${pathname.startsWith('/budget') ? 'active' : ''}`}
            href="/budget"
            onClick={closeMenuOnMobile}
          >
            Budget
          </Link>
          <Link
            className={`link ${pathname === '/about' ? 'active' : ''}`}
            href="/about"
            onClick={closeMenuOnMobile}
          >
            About
          </Link>
          <Link
            className={`link ${pathname === '/blog' ? 'active' : ''}`}
            href="/blog"
            onClick={closeMenuOnMobile}
          >
            Blog
          </Link>
          <div className="mobile-menu-close">
            <FontAwesomeIcon icon={faClose} onClick={toggleShowMenu} />
          </div>
        </div>
        <div className="mobile-menu-open">
          <FontAwesomeIcon icon={faBars} onClick={toggleShowMenu} />
        </div>
      </nav>
      <div className="nav-spacer"></div>
    </>
  )
}