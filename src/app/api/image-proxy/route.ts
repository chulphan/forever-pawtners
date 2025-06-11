import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new Response('Missing url', { status: 400 });

  const imageRes = await fetch(url);
  const imageBuffer = await imageRes.arrayBuffer();

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': imageRes.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
