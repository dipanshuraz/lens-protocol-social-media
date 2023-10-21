'use client'

import { usePathname } from 'next/navigation';
import { usePostContext } from '@/context/PostContext';

export default function Publication() {

  const pathName = usePathname()
  const handle = pathName?.split('/')[2]
  
  const { getSinglePost } = usePostContext();
  const post = getSinglePost(handle);
  console.log(post, 'post')

  if (!post) return null

  return (
    <div className='pt-20'>
    <div className='flex flex-col justify-center items-center'>
      {post?.media && post?.media[0]?.original?.uri && <img
        className='w-64 rounded-full'
        src={post?.media[0]?.original?.uri}
      />
      }
      <p className='text-4xl mt-8 mb-8'>{post?.metadata?.name}</p>
      <p className='text-center text-xl font-bold mt-2 mb-2 w-1/2'>{post?.metadata?.content}</p>
    </div>
  </div>
  )
}