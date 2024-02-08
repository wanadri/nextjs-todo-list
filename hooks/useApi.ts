import { useAuthStore } from "@/store/auth";
import useProjectHeaders from "./useProjectHeaders";
import dayjs from 'dayjs';
import { ofetch } from "ofetch";
import { isNullOrUndefined } from "@/utils/helpers";
import { cookies } from "next/headers";
import route from "@/utils/api_route";

type SearchParams = {
  [key: string]: any;
};

interface UseApiProps {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: SearchParams;
  body?: RequestInit["body"] | Record<string, any>;
  customHeaders?: HeadersInit;
}

interface BaseProps {
  url: string;
}
interface GetProps  extends BaseProps {
  params?: SearchParams;
}
interface PostProps extends BaseProps {
  body?: RequestInit["body"] | Record<string, any>;
}
interface PutProps extends PostProps {

}
interface PatchProps extends PostProps {

}
interface DeleteProps extends BaseProps {

}

// This function is used to make API requests
// _ is consider as private function
const _fetch = async <T>({
  url,
  method = 'GET',
  params,
  body,
  customHeaders
}: UseApiProps): Promise<T> => {
  let headers: HeadersInit = useProjectHeaders();
  let token = localStorage.getItem('token');

  if (! isNullOrUndefined(token)) {
    const tokenExpiredAt = localStorage.getItem('toke_expired_at');
    const twoDaysBefore = dayjs(tokenExpiredAt)
      .subtract(2, 'days')
      .format('YYYY-MM-DD HH:mm:ss');

    if (twoDaysBefore <= dayjs().format('YYYY-MM-DD HH:mm:ss')) {
      const { data } = await useAuthStore.getState().refreshToken(token!);
      token = data?.token;
    }

    Object.assign(headers, { Authorization: `Bearer ${token}` });
  } else {
    if (url !== route.auth.token) {
      await useAuthStore.getState().getToken();

      token = localStorage.getItem('token');
      Object.assign(headers, { Authorization: `Bearer ${token}` });
    }
  }

  if (customHeaders) {
    headers = Object.assign(headers, customHeaders);
  }

  return await ofetch<T>(url, {
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    method,
    headers,
    ...(body && { body }),
    ...(params && { query: params }),
    onRequest: async (context: any) => {
        console.log('onRequest')
    },
    onResponse: () => {
        console.log('onResponse')
    },
  });
}

const request = {
  get: async <T>({ url, params }: GetProps) =>  await _fetch<T>({ url, params }),
  post: async <T>({ url, body }: PostProps) => await _fetch<T>({ url, method: 'POST', body }),
  patch: async <T>({ url, body }: PatchProps) => await _fetch<T>({ url, method: 'PATCH', body }),
  put: async <T>({ url, body }: PutProps) => await _fetch<T>({ url, method: 'PUT', body }),
  destroy: async <T>({ url }: DeleteProps) =>  await _fetch<T>({ url, method: 'DELETE' })
};

export default request;
