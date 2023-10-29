import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import ipfsToHttp from '../utils/ipfsToHttp';

function BlogPost({ post }) {
    
    const description = post?.metadata?.description;
    const content = post?.metadata?.content;
    
    const mediaType = post?.metadata?.media[0]?.original?.mimeType;
    const mediaContent = post?.metadata?.media[0]?.original?.url;
    
    const profile = post.profile?.handle;
    const profileImage = post?.profile?.picture?.original?.url;

    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && Hls.isSupported() && mediaType === 'video/quicktime') {
            const hls = new Hls();
            hls.loadSource(mediaContent);
            hls.attachMedia(videoRef.current);
        } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegURL')) {
            // Some browsers (Apple devices) can play HLS without hls.js
            videoRef.current.src = mediaContent;
        }
    }, [mediaContent, mediaType]);

    return (
        <div className="bg-gray-700 rounded-lg shadow-md m-4 md:m-16 p-4 md:p-8 min-h-screen">
            {/* Render image or video based on MIME type */}
            {mediaType === 'image/png' && <Image src={ipfsToHttp(mediaContent)} alt="Media Content" className="w-full object-cover rounded-t-md" height={1600} width={900} />}
            {mediaType === 'video/quicktime' && (
                <video controls ref={videoRef} className="w-full lg:w-6/12">
                    Your browser does not support the video tag.
                </video>
            )}
            
            <div className="p-4">
                <div className="prose overflow-auto">
                    <ReactMarkdown children={content} />
                </div>
            </div>

            <div className='flex justify-start items-center p-4'>
                Created By 
                <Image src={ipfsToHttp(profileImage)} alt="user image" className="h-8 w-8 object-cover mx-2 rounded-full" width={100} height={100} />
                {profile}
            </div>
        </div>
    );
}

export default BlogPost;
