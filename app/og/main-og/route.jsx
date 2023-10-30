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

    const { image, content : bio, name } = dataObject
    const content = bio.length > 60 ? `${bio.slice(0, 60)}...` : bio;
    const title = name.length > 40 ? `${name.slice(0, 40)}...` : name;

    return new ImageResponse(
      <div tw='flex flex-col w-full h-full items-center justify-center bg-black relative'>
      <div tw='flex w-full'>
        <div tw='flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-around'>
        <img src={image} tw='rounded-full h-48 w-48 absolute left-24 bg-white' />
        <div tw='flex justify-start items-start flex-col pl-24'>
          <h1 tw='text-7xl text-white font-medium'>{title}</h1>
          <h6 tw='text-2xl text-white'>{content}</h6>
        </div>
        </div>
      </div>
    </div>,
      {
        width: 1000,
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