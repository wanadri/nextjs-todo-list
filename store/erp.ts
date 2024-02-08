import useApi from '@/hooks/useApi';
import { create } from 'zustand'
import route from '@/utils/api_route';
import zukeeper from 'zukeeper';

type ErpState = {
  erpList: IErpListResponse[];
  regionPolygon: IRegionPolygonResponse[];

  getLeafletPolygon(): any;
  getErpList(): Promise<IBaseResponse<IErpListResponse[]>>;
  getRegionPolygon(): Promise<IBaseResponse<IRegionPolygonResponse[]>>;
};

export const useErpStore = create<ErpState>()((set, get) => ({
  // state
  erpList: [],
  regionPolygon: [],

  // getters
  getLeafletPolygon: () => {
    return get().regionPolygon.filter(region => region.type === 'polygon' && region.district !== 'Sepang').map((region) => {
      return region.coordinates.map((coordinate) => [coordinate.lat, coordinate.lng])
    });
  },

  // actions
  async getErpList(): Promise<IBaseResponse<IErpListResponse[]>> {
    const response = await useApi.get<IErpListResponse[]>({
      url: route.erp.list,
    });

    set({ erpList: response.data });
    return response;
  },
  async getRegionPolygon(): Promise<IBaseResponse<IRegionPolygonResponse[]>> {
    const response = await useApi.get<IRegionPolygonResponse[]>({
      url: route.erp.region_polygon,
    });

    set({ regionPolygon: response.data });

    return response;
  }
}))