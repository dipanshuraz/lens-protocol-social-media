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

  const {
    data: {
      profile: { name = "", bio, picture },
    },
  } = profile;

  const pic = picture?.original?.url || ''

    // check if 500 default time or show error   
  return {
    title: name,
    description : bio,
    openGraph: {
        images: [`https://lens-protocol-social-media.vercel.app/og?title=${name}`],
      },  
  }
}

const layout = ({ children }) => {
  return (
    <>{children}</>
  )
}

export default layout