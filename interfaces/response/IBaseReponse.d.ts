interface IBaseResponse<T> {
  error: boolean;
  message: string;
  data: T;
  app_version: IAppVersion;
}

interface IAppVersion {
  app_link: string|null;
  app_update_level: string|null;
  app_update_message: string|null;
  later_version: string;
}