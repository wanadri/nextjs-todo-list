import useApi from '@/hooks/useApi';
import { create } from 'zustand'
import route from '@/utils/api_route';

type ErpState = {
  erpList: IErpListResponse[];
  getErpList(): Promise<IBaseResponse<IErpListResponse[]>>;
};

export const useErpStore = create<ErpState>()((set, get) => ({
  erpList: [],
  async getErpList(): Promise<IBaseResponse<IErpListResponse[]>> {
    const response = await useApi.get<IErpListResponse[]>({
      url: route.erp.list,
    });

    set({ erpList: response.data });
    return response;
  }
}))