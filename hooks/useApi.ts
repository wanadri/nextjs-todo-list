import useProjectHeaders from "./useProjectHeaders";

type SearchParams = {
  [key: string]: string;
};

interface UseApiProps {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: SearchParams;
  body?: BodyInit;
  signal?: AbortSignal | null;
}

interface BaseProps {
  url: string;
}
interface GetProps  extends BaseProps {
  params?: SearchParams;
}
interface PostProps extends BaseProps {
  body?: BodyInit;
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
  signal
}: UseApiProps): Promise<Response> => {

  let headers: HeadersInit = {
    'Content-Type': 'application/json',
    // ...useProjectHeaders()
  };

  let requestUrl = process.env.NEXT_PUBLIC_ENDPOINT + url;

  if (params) {
    requestUrl += '?' + new URLSearchParams(params).toString();
  }

  return await fetch(requestUrl, {
    method,
    headers,
    body,
    signal
  });
}

const apiRequest = {
  get: async <T>({ url, params }: GetProps) => {
    return await _fetch<T>({ url, params });
  },
  post: async <T>({ url, body }: PostProps) => {
    return await _fetch<T>({ url, method: 'POST', body });
  },
  patch: async <T>({ url, body }: PatchProps) => {
    return await _fetch<T>({ url, method: 'PATCH', body });
  },
  put: async <T>({ url, body }: PutProps) => {
    return await _fetch<T>({ url, method: 'PUT', body });
  },
  destroy: async <T>({ url }: DeleteProps) => {
    return await _fetch<T>({ url, method: 'DELETE' });
  }
};

export default apiRequest;
