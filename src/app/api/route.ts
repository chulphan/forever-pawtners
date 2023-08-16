import { NextResponse, type NextRequest } from 'next/server';
import { httpGet } from '../_lib/util/http';

export async function GET(request: NextRequest) {
  return new Response('Hello api route~~');
}

export async function POST(request: NextRequest) {
  /**
   * request body: {
   *  endpoint:
   *  queryParam: {
   *
   * }
   * }
   */
  const requestJson = await request.json();

  const response = await httpGet(requestJson.endpoint, requestJson.queryParam);

  return NextResponse.json(response);
}
