import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Themed from '@/app/_components/Themed'
import SiteLayout from '@/app/_components/SiteLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kent Codes',
  description: 'My personal site, built with Next.js and other cool stuff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Themed>
          <SiteLayout>
            {children}
          </SiteLayout>
        </Themed>
      </body>
    </html>
  )
}