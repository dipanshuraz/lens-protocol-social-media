import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProfileCard = ({
    handle, image, bio, name, id, width
}) => {

    const truncatedBio = bio.length > 100 ? `${bio.slice(0, 100)}...` : bio;

  return (
      <div className={`w-full px-4 mx-auto pt-16 ${width}`}>
      <Link href={`/profile/${handle}`}>
        <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-sm rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center relative">
                <div className="absolute -top-20">
                  <Image className="shadow-xl rounded-full w-48 h-48"  alt="Profile" src={image} width={300} height={300}/>
                </div>
              </div>
            </div>
            <div className="text-center mt-36">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blue-700">{name}</h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blue-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blue-400"></i> {handle}
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blue-200 text-center h-48">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-base leading-relaxed text-blue-700">{truncatedBio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
  );
}

export default ProfileCard;
