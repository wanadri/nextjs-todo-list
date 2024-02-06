type RequestHeaders = {
  "x-powered-by": string;
  "client-service": string;
  accept: string;
}

const headers = (): RequestHeaders => {
  return {
    "x-powered-by": process.env.NEXT_PUBLIC_X_POWERED_BY,
    "client-service": process.env.NEXT_PUBLIC_CLIENT_SERVICE,
    accept: process.env.NEXT_PUBLIC_ACCEPT,
  };
}

export default headers;