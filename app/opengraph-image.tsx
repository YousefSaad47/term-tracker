import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const imageData = await readFile(
    join(process.cwd(), '/public/icons/logo.png')
  );
  const base64Image = Buffer.from(imageData).toString('base64');
  const imageSrc = `data:image/png;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          color: 'white',
          borderRadius: 12,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={imageSrc}
          alt="Logo"
          style={{ marginBottom: 20, objectFit: 'cover' }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
