import ProfileCard from '@/app/components/ProfileCard';
import { ImageResponse } from 'next/server';
import { Base64 } from 'js-base64';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    let data = searchParams.get('data')
    data = data.replace(/-/g, '+').replace(/_/g, '/');

    // Decode
    const decodedJsonString = Base64.decode(data, { utf8: true });
    const dataObject = JSON.parse(decodedJsonString);
    console.log(dataObject, 'dataObject')

    const { image, handle, bio, name } = dataObject
    const truncatedBio = bio.length > 100 ? `${bio.slice(0, 100)}...` : bio;

    return new ImageResponse(
      <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt="Vercel"
              height={200}
              src={image}
              style={{ margin: '0 30px', borderRadius : '50%' }}
              width={232}
            />
          </div>
          <div
            style={{
              fontSize: 50,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {name}
          </div>
          <div style={{
            color : 'white'
          }}>
            {truncatedBio}
          </div>
        </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
