import Link from 'next/link'
import './globals.css'
import Prompt from './components/Prompt'
import { Metadata } from 'next';
import { Base64 } from 'js-base64';

export async function generateMetadata({ params }) {

  const DataObject = {
    image: 'https://www.orb.ac/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forb-logo-letter-black.7a11a7c5.png&w=256&q=75',
    content: 'Everyday app for web3 social.',
    name: 'ORB Lens 🌿',
    id: '1234567890'
  };

  console.log(DataObject, 'DataObject')
  // Encode
  const jsonString = JSON.stringify(DataObject);
  let base64String = Base64.encode(jsonString);
  base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  console.log(base64String, 'base64String')

  const metaImage = `https://lens-protocol-social-media.vercel.app/og/main-og?data=${base64String}`;
  const { name, id, content } = DataObject
  
return {
  title: name,
  description : content,
  openGraph: {
    images: [metaImage],
  },  
  twitter: {
    card: metaImage,
    title: name,
    description: content,
    siteId: '1467726470533754880',
    creator: `@${DataObject?.handle}`,
    creatorId: id,
    images: [metaImage],
  },
}
}
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