import { Header } from '@/components/Header'
import { Roboto_Flex as Roboto } from 'next/font/google'

import { ReactNode } from 'react'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
// export const montSerrat = Montserrat({ subsets: ['latin'], weight: '600' })

export const metadata = {
  title: 'Post Simulator',
  description: 'Post Simulator for docker practice',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Header></Header>
        {children}
      </body>
    </html>
  )
}
