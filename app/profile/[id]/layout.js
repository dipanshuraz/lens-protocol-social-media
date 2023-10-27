import React from 'react'
import { Metadata } from 'next'
import { client, getProfile } from '@/api'
 
export async function generateMetadata({ params }) {
  
  console.log(params, 'params ---------')
  const handle = params.id

  const profile = await client.query({
    query: getProfile,
    variables: { handle }
  })

  console.log(profile, 'returnedProfile ---- >')
  const { name = '' , bio, picture } = profile
//   const pic = picture?.original?.url || ''

  return {
    title: name,
    description : bio,
    // openGraph: {
    //     images: [pic],
    //   },  
  }
}

// either Static metadata
// export const metadata = {
//     title: 'JOSH',
//   }
  

const layout = ({ children }) => {
  return (
    <>{children}</>
  )
}

export default layout