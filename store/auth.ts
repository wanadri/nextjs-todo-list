import { create } from 'zustand'
import useApi from '@/hooks/useApi';
import crypto from 'crypto';
import {osName, osVersion } from 'react-device-detect';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import route from '@/utils/api_route';

type AuthState = {
  token: string | null;
  getToken(): Promise<IBaseResponse<ITokenResponse>>;
  refreshToken(old_token: string): Promise<IBaseResponse<ITokenResponse>>;
}

export const useAuthStore = create<AuthState>()((set,get) => ({
  token: null,
  async getToken(): Promise<IBaseResponse<ITokenResponse>> {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();

    let os_version = osVersion;
    let os_type = 'browser';
    let device_name = osName;
    let device_id = crypto.createHash('sha256').update(visitorId).digest('hex');

    const response = await useApi.post<ITokenResponse>({
      url: route.auth.token,
      body: {
        os_type,
        device_name,
        device_id,
        os_version,
      },
    });

    const { data } = response;
    set({ token: data.token });

    document.cookie = `token=${data.token};`;
    localStorage.setItem('token', data.token);
    localStorage.setItem('toke_expired_at', data.token_expired_formatted);

    return response;
  },
  async refreshToken(old_token: string): Promise<IBaseResponse<ITokenResponse>> {
    localStorage.removeItem('token');
    const response = await useApi.post<ITokenResponse>({
      url: route.auth.refresh_token,
      body: { old_token },
    });

    let { data } = response;

    set({ token: data.token });

    return response;
  }
}))