import React from 'react';
import { Metadata } from 'next';
import { client, getProfile } from '@/api';
import { Base64 } from 'js-base64';

export async function generateMetadata({ params }) {
  const handle = params.id;
  const profileResp = await client.query({
    query: getProfile,
    variables: { handle }
  });

  const profile = profileResp?.data?.profile;

  const DataObject = {
    image: profile.picture?.uri || profile.picture.original.url,
    handle: profile.handle,
    bio: profile.bio,
    name: profile.name,
    id: profile.id
  };

  // Encode
  const jsonString = JSON.stringify(DataObject);
  let base64String = Base64.encode(jsonString);
  base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  console.log(base64String, 'base64String')

  const metaImage = `https://lens-protocol-social-media.vercel.app/og/profile-og?data=${base64String}`;
  
  const { bio, name, id } = DataObject;

  return {
    title: name,
    description: bio,
    openGraph: {
      images: [metaImage],
    },  
    twitter: {
      card: metaImage,
      title: name,
      description: bio,
      siteId: '1467726470533754880',
      creator: `@${handle}`,
      creatorId: id,
      images: [metaImage],
    },
  };
}

const layout = ({ children }) => {
  return <>{children}</>;
};

export default layout;
