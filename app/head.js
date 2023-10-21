import Head from 'next/head'
 
function HeadTitle() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
    </div>
  )
}
 
export default HeadTitle