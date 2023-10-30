'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BlogPost from '@/app/components/Blog';
import Loader from '@/app/components/Loader';
import { client, getPublication } from '@/api'

export default function Publication() {
  const pathName = usePathname()

  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    
      const fetchPost = async () => {
        try {
          let handle = pathName?.split('/')[2]
          const response = await client.query({
            query: getPublication,
            variables: {
              internalPublicationId: handle
            }
          })
          
          setIsLoading(false)
          setPost(response?.data?.publication)
        } catch (error) {
          setIsLoading(false)
        }
    }

    fetchPost()

  }, [])  

  if (!post || isLoading) return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <Loader />
    </div>
  );

  return (
    <div className='pt-4 bg-black'>
      <BlogPost post={post}/>
    </div>
  )
}