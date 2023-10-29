'use client'

import { usePathname } from 'next/navigation';
import { usePostContext } from '@/context/PostContext';
import BlogPost from '@/app/components/Blog';
import Loader from '@/app/components/Loader';
import { client, getPublication } from '@/api'
import { useEffect } from 'react';

export default function Publication() {

  const pathName = usePathname()
  const handle = pathName?.split('/')[2]
  
  const { getSinglePost } = usePostContext();
  const post = getSinglePost(handle);
  // console.log(post, 'post')

  useEffect(() => {
    const fetchPost = async () => {

      const pubs = await client.query({
        query: getPublication,
        variables: {
          internalPublicationId: "0x01-0x01"
        }
      })

      console.log(pubs, 'pubs ---- ')
    }

    fetchPost()
  }, [])  

  if (!post) return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <Loader />
    </div>
  );

  return (
    <div className='pt-20'>
      <BlogPost post={post}/>
    </div>
  )
}