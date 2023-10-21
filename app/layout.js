import { Inter } from 'next/font/google'
import { PostProvider } from '../context/PostContext'
import './globals.css'

import { BrowserView, MobileView } from 'react-device-detect';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const MobilePrompt = () => {
  return <div className="bg-blue-500 text-white p-4 rounded shadow-md fixed bottom-0 right-0 m-4 flex items-center space-x-3">
  <img src="https://www.orb.ac/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forb-logo-letter-black.7a11a7c5.png&w=256&q=75" alt="Orb App Icon" className="h-8 w-8" />
  <div>
      <p className="font-bold">Open in Orb App</p>
      <p className="text-sm">Get the best experience in our app.</p>
  </div>
  <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-white text-sm">
      Open
  </button>
</div>
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <MobilePrompt />
        <BrowserView>
          <h1>This is rendered only in browser</h1>
        </BrowserView>
        <MobileView>
          <h1>This is rendered only on mobile</h1>
        </MobileView>
        <PostProvider>
          {children}
        </PostProvider>
      </body>
    </html>
  )
}
