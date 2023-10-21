// hooks/useTabTitle.js

import { useEffect } from 'react';
import Head from 'next/head';

function useTabTitle(title) {
//   useEffect(() => {
//     if (title) {
//       Head.rewind();
//     }
//   }, [title]);

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

export default useTabTitle;
