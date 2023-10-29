'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client, exploreProfiles } from '../api';
import Loader from './components/Loader';
import ProfileCard from './components/ProfileCard';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [isLoadingprofiles, setIsLoadingProfiles] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      setIsLoadingProfiles(true);
      
      let response = await client.query({ query: exploreProfiles });
      
      let profileData = await Promise.all(response.data.exploreProfiles.items.filter(async profileInfo => {
        return profileInfo.picture.__typename === 'MediaSet';
      }));

      setProfiles(profileData);
      setIsLoadingProfiles(false);
    } catch (err) {
      setIsLoadingProfiles(false);
      setError(JSON.stringify(err));
      console.log({ err });
    }
  }

  function closeError() {
    setError(null);
  }

  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl mb-6 font-bold'>Hello ORB Lens 🌿</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeError}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        <div className='flex justify-center items-center flex-wrap px-8'>
          {
            isLoadingprofiles ? 
            <div className='h-[50vh] flex justify-center items-center'>
              <Loader />
            </div> : 
            Array.isArray(profiles) && profiles.map(profile => <ProfileCard 
              key={profile?.id}
              image={profile.picture?.uri || profile.picture?.original?.url}
              handle={profile.handle}
              bio={profile.bio}
              name={profile?.name}
              id={profile?.id}
              width={'lg:w-4/12'}
             />)
          }
        </div>
      </div>
    </div>
  );
}
