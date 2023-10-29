import React from 'react'
import { Metadata } from 'next'
 
export async function generateMetadata({ params }) {

    console.log('inside posts -----')

//   const handle = params.id

//   const profile = await client.query({
//     query: getProfile,
//     variables: { handle }
//   })

//   console.log(profile, 'returnedProfile ---- >')

//   const {
//     data: {
//       profile: { name = "", bio, picture, id },
//     },
//   } = profile;

//   const metaImage = `https://lens-protocol-social-media.vercel.app/og?title=${name}`
    
  return {
    // title: name,
    // description : bio,
    // openGraph: {
    //     images: [metaImage],
    //   },  
    // twitter: {
    //   card: metaImage,
    //   title: name,
    //   description: bio,
    //   siteId: '1467726470533754880',
    //   creator: `@${handle}`,
    //   creatorId: id,
    //   images: [metaImage],
    // },
  }
}

const layout = ({ children }) => {
  return (
    <>{children}</>
  )
}

export default layout