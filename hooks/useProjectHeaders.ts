type RequestHeaders = {
  "x-powered-by": string;
  "client-service": string;
  accept: string;
  "app-package": string;
  "content-type": string;
}

const headers = (): RequestHeaders => {
  return {
    "x-powered-by": process.env.NEXT_PUBLIC_X_POWERED_BY,
    "client-service": process.env.NEXT_PUBLIC_CLIENT_SERVICE,
    accept: process.env.NEXT_PUBLIC_ACCEPT,
    "app-package": process.env.NEXT_PUBLIC_APP_PACKAGE,
    "content-type": "application/json"
  };
}

export default headers;