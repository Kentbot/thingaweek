'use client'

import React from 'react'

import { BlogNav } from './nav/BlogNav'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlogNav />
      <div className="page-contents">
        {children}
      </div>
    </>
  )
}