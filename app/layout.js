import Link from 'next/link'
import './globals.css'
import Prompt from './components/Prompt'

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Prompt message={"HELLo"} />
        <Link href={`/`}>
          <h1 className='text-4xl mt-10 font-bold text-center'>ORB Lens 🌿</h1>
        </Link>
        {children}
      </body>
    </html>
  )
}