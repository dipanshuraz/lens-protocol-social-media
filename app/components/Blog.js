import React from 'react';
import ReactMarkdown from 'react-markdown';

function BlogPost({ post }) {

    console.log(post, 'post')
    
    const description = post?.metadata?.description
    const content = post?.metadata?.content
    const bgImage = post?.metadata?.media[0]?.original?.url
    const profile = post.profile?.handle
    const profileImage = post?.profile?.picture?.original?.url

    return (
        <div className="bg-gray-400 rounded-lg shadow-md m-4 md:m-16 p-4 md:p-8">
            {bgImage && <img src={bgImage} alt="Blog Background" className="w-full object-cover rounded-t-md" />}
            <div className="p-4">
                <div className="prose overflow-auto max-h-[300px]">
                    <ReactMarkdown children={content} />
                </div>  
            </div>

            <div className='flex justify-start items-center p-4'>
                Created By <img src={profileImage} alt="user image" className="h-8 w-8 object-cover mx-2 rounded-full" /> {profile}
            </div>
        </div>
    );
}

export default BlogPost;
