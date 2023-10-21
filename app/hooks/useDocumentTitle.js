import { useEffect } from 'react';
import Head from 'next/head';

function useDocumentTitle(title) {
    useEffect(() => {
        <Head>
            <title>{title}</title>
        </Head>
    }, [title]); 
}
