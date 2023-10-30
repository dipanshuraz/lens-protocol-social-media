'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { client, getPublications, getProfile } from '../../../api'
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'
import Loader from '@/app/components/Loader';
import ProfileCard from '@/app/components/ProfileCard';

export default function Profile() {

  const [profile, setProfile] = useState({})
  const [publications, setPublications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const pathName = usePathname()
  const handle = pathName?.split('/')[2]
  
  useEffect(() => {
    if (handle) {
      fetchProfile()
    }
  }, [handle])

  async function fetchProfile() {
    try {
      setIsLoading(true)
      
      const returnedProfile = await client.query({
        query: getProfile,
        variables: { handle }
      })

      setProfile(returnedProfile.data.profile)

      const pubs = await client.query({
        query: getPublications,
        variables: {
            id: returnedProfile.data.profile.id, limit: 50,
        }
      })
    
      setPublications(pubs.data.publications.items)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log('error fetching profile...', err)
    }
  }

  if (isLoading) return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <Loader />
    </div>
  );

  console.log(profile, 'profile')

  return (
    <div className='bg-black'>
     <div className="w-11/12 md:w-10/12 mx-auto rounded-xl shadow-md overflow-hidden">
        {
          <>
          <ProfileCard 
            image={profile?.picture?.uri || profile?.picture?.original?.url}
            handle={profile?.handle}
            bio={profile?.bio}
            name={profile?.name}
            width={'lg:w-6/12'}
           />

          <h6 className='text-center pb-8 text-white font-bold text-2xl underline'>Publications List</h6>

          <div className='flex flex-col justify-center items-center '>
            {publications.map(pub => (
              <div key={pub?.id} className='text-white px-2 rounded mb-8 underline'>
                <Link href={`/post/${pub.id}`}>
                  <p className='text-left'>
                    <ReactMarkdown>
                      {pub.metadata.content.length > 60
                        ? `${pub.metadata.content.substring(0, 60)}...`
                        : pub.metadata.content}
                    </ReactMarkdown>
                  </p>
                </Link>
              </div>
            ))}
          </div></>
        }   
      </div>
    </div>
  )
}