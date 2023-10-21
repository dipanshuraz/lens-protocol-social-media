'use client'

import { usePathname } from 'next/navigation';
import { usePostContext } from '@/context/PostContext';
import BlogPost from '@/app/components/Blog';
import Loader from '@/app/components/Loader';

export default function Publication() {

  const pathName = usePathname()
  const handle = pathName?.split('/')[2]
  
  const { getSinglePost } = usePostContext();
  const post = getSinglePost(handle);
  console.log(post, 'post')

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