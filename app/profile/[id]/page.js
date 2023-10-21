'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { client, getPublications, getProfile } from '../../../api'
import Link from 'next/link';
import { usePostContext } from '@/context/PostContext';

export default function Profile() {

    const { setPosts } = usePostContext();

  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState({})
  const [publications, setPublications] = useState([])
  /* using the router we can get the lens handle from the route path */
  const pathName = usePathname()
  const handle = pathName?.split('/')[2]
  
  useEffect(() => {
    if (handle) {
      fetchProfile()
    }
  }, [handle])

  async function fetchProfile() {
    try {
      /* fetch the user profile using their handle */
      const returnedProfile = await client.query({
        query: getProfile,
        variables: { handle }
      })
      console.log(returnedProfile, 'returnedProfile')

      setProfile(returnedProfile.data.profile)
      /* fetch the user's publications from the Lens API and set them in the state */
      const pubs = await client.query({
        query: getPublications,
        variables: {
            id: returnedProfile.data.profile.id, limit: 50
        }
      })
      console.log(pubs.data.publications.items, 'pubs.data.publications.items')

      setPublications(pubs.data.publications.items)
      setPosts(pubs.data.publications.items)
      
    } catch (err) {
      console.log('error fetching profile...', err)
    }
  }

  if (!profile) return null

  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-center items-center'>
        <img
          className='w-64 rounded-full'
          src={profile.picture?.uri || profile.picture?.original?.url}
        />
        <p className='text-4xl mt-8 mb-8'>{profile.handle}</p>
        <p className='text-center text-xl font-bold mt-2 mb-2 w-1/2'>{profile.bio}</p>
        {
            publications.map(pub => (
              <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
              <Link href={`/post/${pub.id}`}>
                <p>{pub.metadata.content}</p>
              </Link>
              </div>
            ))
        }
      </div>
    </div>
  )
}