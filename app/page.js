'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client, exploreProfiles } from '../api'
import Loader from './components/Loader'
// import useDocumentTitle from './hooks/useDocumentTitle'

export default function Home() {
  
  // useDocumentTitle('Orb | Home')

  const [profiles, setProfiles] = useState([])
  const [isLoadingprofiles, setIsLoadingProfiles] = useState(false)
  
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      setIsLoadingProfiles(true)
      
      let response = await client.query({ query: exploreProfiles })
      
      let profileData = await Promise.all(response.data.exploreProfiles.items.filter(async profileInfo => {
        return profileInfo.picture.__typename === 'MediaSet'
      }))

      setProfiles(profileData)
      setIsLoadingProfiles(false)
    } catch (err) {
      setIsLoadingProfiles(false)
      console.log({ err })
    }
  }

  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl mb-6 font-bold'>Hello ORB Lens 🌿</h1>
          <div className='flex flex-row flex-wrap justify-center'>
          {
            isLoadingprofiles ? 
            <div className='flex justify-center items-center h-[50vh]'>
              <Loader />
            </div> : 
          profiles.map(profile => (
            <>
              <div key={profile.id} className="bg-white rounded-xl shadow-md overflow-hidden w-96 m-4 flex justify-between flex-col">
              <div className="flex items-center justify-center h-56 bg-blue-500">
                <img class="h-40 w-40 rounded-full" src={profile.picture?.uri || profile.picture?.original?.url} alt="User Name" />
              </div>
              <div className="p-4 h-full">
                <Link href={`/profile/${profile.handle}`}>
                  <p className='cursor-pointer text-violet-600 font-medium text-left mt-2 mb-2'>{profile.handle}</p>
                </Link>
                <p class="mt-4 text-gray-700">{profile.bio}</p>
              </div>
              <div class="p-4 border-t border-gray-200">
                <button class="text-blue-500 hover:text-blue-600 font-semibold">Followers : {profile.stats.totalFollowers}</button>
              </div>
            </div>
            </>
          ))
        }
        </div>
      </div>
    </div>
  )
}
