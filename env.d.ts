export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENDPOINT: string;
      NEXT_PUBLIC_X_POWERED_BY: string;
      NEXT_PUBLIC_ACCEPT: string;
      NEXT_PUBLIC_CLIENT_SERVICE: string;
      NEXT_PUBLIC_APP_VERSION: Number;
      NEXT_PUBLIC_APP_PACKAGE: string;
      NEXT_PUBLIC_LANGUAGE: string;
    }
  }
}
