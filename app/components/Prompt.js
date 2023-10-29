'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const CloseBtnSVG = () => <svg className="fill-current h-6 w-6 text-gray-800" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>

function Prompt() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const promptClosed = sessionStorage.getItem('promptClosed');
    if (!promptClosed || promptClosed === "false") {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('promptClosed', "true");
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative z-40" role="alert">
      <div>
        <div className="flex pt-12 md:pt-6 justify-center items-center">
          <div className="md:hidden bg-blue-500 text-white p-2 rounded shadow-md fixed m-4 flex justify-center items-center space-x-6">
            <img src="https://www.orb.ac/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forb-logo-letter-black.7a11a7c5.png&w=256&q=75" alt="Orb App Icon" className="h-8 w-10 mx-2" />
            <div>
              <p className="text-sm">Get the best experience in our app.</p>
            </div>
            <Link className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-white text-sm" href={`https://www.orb.ac/`}>
              Open
            </Link>
            <span className="p-2" onClick={handleClose}>
              <CloseBtnSVG />
            </span>
          </div>
        </div>

        <div className="hidden md:block bg-gray-200 text-white p-2 rounded shadow-md fixed m-4 flex flex-col justify-center items-center px-12">
          <div className='flex justify-center items-center'>
            <img src="https://www.orb.ac/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Forb-logo-letter-black.7a11a7c5.png&w=256&q=75" alt="Orb App Icon" className="h-8 pr-2" />
            <p className="text-gray-900 text-sm">For a better experience, download our app</p>
            <span className="p-2 absolute top-0 right-0" onClick={handleClose}>
            <CloseBtnSVG />
            </span>
          </div>
          <div className='flex justify-start py-2'>
            <Link className="" href={`https://apps.apple.com/us/app/orb-everyday-web3-social-app/id1638461963`}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/320px-Download_on_the_App_Store_Badge.svg.png' className='w-32'/>
            </Link>
            <Link className="pl-4" href={`https://play.google.com/store/apps/details?id=app.orb.flutter`}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png' className='w-32' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
