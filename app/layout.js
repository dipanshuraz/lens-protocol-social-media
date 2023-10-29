import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import Prompt from './components/Prompt'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Prompt message={"HELLo"} />
          {children}
      </body>
    </html>
  )
}