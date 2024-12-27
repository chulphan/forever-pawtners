import {
  ResponseBodyType,
  ResponseHeaderType,
  ResponseType,
} from '@/app/_types';

export const httpGet = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<ResponseBodyType<T> | ResponseHeaderType> => {
  const baseUrl = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc';
  const SERVICE_KEY = process.env.SERVICE_KEY;

  const url = new URL(
    `${baseUrl}/${endpoint}?serviceKey=${SERVICE_KEY}&_type=json`
  );

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    const response = await fetch(url, { method: 'GET' });

    if (response.ok) {
      const responseJson: ResponseType<T> = await response.json();
      const responseHeader = responseJson.response.header;
      const responseBody = responseJson.response.body ?? {
        items: { item: [] },
        pageNo: 1,
        numOfRows: 0,
        totalCount: 0,
      };

      if (responseHeader.errorMsg) {
        throw responseHeader;
      }

      return responseBody;
    } else {
      throw new Error(response.statusText);
    }
  } catch (e: any) {
    console.error('error httpGet: ', e);
    if (e instanceof Error) {
      return {
        reqNo: '',
        resultCode: '',
        resultMsg: '',
        errorMsg: e.message,
      } as ResponseHeaderType;
    }

    return e as ResponseHeaderType;
  }
};
