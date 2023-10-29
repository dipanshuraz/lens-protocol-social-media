'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { client, getPublications, getProfile } from '../../../api'
import Link from 'next/link';
import { usePostContext } from '@/context/PostContext';
import ReactMarkdown from 'react-markdown'
import Loader from '@/app/components/Loader';

export default function Profile() {

  const { setPosts } = usePostContext();

  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState({})
  const [publications, setPublications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      setIsLoading(true)
      
      const returnedProfile = await client.query({
        query: getProfile,
        variables: { handle }
      })
      console.log(returnedProfile, 'returnedProfile')

      setProfile(returnedProfile.data.profile)

      const pubs = await client.query({
        query: getPublications,
        variables: {
            id: returnedProfile.data.profile.id, limit: 50
        }
      })
    
      setPublications(pubs.data.publications.items)
      setPosts(pubs.data.publications.items)
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

  return (
    <div className='pt-20'>
    <div className="w-11/12 md:w-8/12 mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden">
          {
            <>
            <div className="flex items-center justify-center h-56 bg-blue-500">
              <img class="h-40 w-40 rounded-full" src={profile.picture?.uri || profile.picture?.original?.url} alt="User Name" />
            </div>
            <div className="p-4">
              <h3 class="font-semibold text-purple-600">{profile.handle}</h3>
              <p class="mt-4 text-gray-700 text-base">{profile.bio}</p>
            </div><div class="p-4 border-t border-gray-200">
              <button class="text-blue-500 hover:text-blue-600 font-semibold">Follow</button>
              <button class="ml-4 text-gray-500 hover:text-gray-600 font-semibold">Message</button>
            </div><div className='flex flex-col justify-center items-center '>
              {publications.map(pub => (
                <div key={pub.id} className='text-black px-2 rounded mb-8 underline'>
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