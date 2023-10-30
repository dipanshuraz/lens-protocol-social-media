import React from 'react'
import { Metadata } from 'next'
import { client, getPublication } from '@/api'
import { Base64 } from 'js-base64'
 
export async function generateMetadata({ params }) {

    const handle = params.id
    const response = await client.query({
      query: getPublication,
      variables: {
        internalPublicationId: handle
      }
    })

    const post = response?.data?.publication
    const { id, metadata : { name, content}, profile } = post;

    const DataObject = {
      image: profile.picture?.uri || profile.picture.original.url,
      handle: profile.handle,
      bio: content,
      name: name,
      id: id
    };

    console.log(DataObject, 'DataObject')
    // Encode
    const jsonString = JSON.stringify(DataObject);
    let base64String = Base64.encode(jsonString);
    base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    console.log(base64String, 'base64String')

    const metaImage = `https://lens-protocol-social-media.vercel.app/og/profile-og?data=${base64String}`;
    
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

const layout = ({ children }) => {
  return (
    <>{children}</>
  )
}

export default layout