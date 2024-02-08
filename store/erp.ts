import useApi from '@/hooks/useApi';
import { create } from 'zustand'
import route from '@/utils/api_route';
import { IRegionPolygonResponse } from '@/interfaces/response/IRegionPolygonResponse';
import { IAreaPolygon } from '@/interfaces/response/IAreaPolygon';

type ErpState = {
  erpList: IErpListResponse[];
  regionPolygon: IRegionPolygonResponse[];
  selectedErp: IErpListResponse | null;
  selectedErpPolygon: IAreaPolygon[];

  getLeafletPolygon(): any;
  getErpList(): Promise<IBaseResponse<IErpListResponse[]>>;
  getRegionPolygon(): Promise<IBaseResponse<IRegionPolygonResponse[]>>;
  getAreaPolygonPath(erp_id: string): Promise<IBaseResponse<IAreaPolygonPath>>;
};

export const useErpStore = create<ErpState>()((set, get) => ({
  // state
  erpList: [],
  regionPolygon: [],
  selectedErp: null,
  selectedErpPolygon: [],

  // getters
  getLeafletPolygon: () => {
    return get().regionPolygon.filter(region => region.type === 'polygon' && region.district !== 'Sepang').map((region) => {
      return region.coordinates.map((coordinate) => [coordinate.lat, coordinate.lng])
    });
  },

  // actions
  async getErpList(): Promise<IBaseResponse<IErpListResponse[]>> {
    const response = await useApi.get<IBaseResponse<IErpListResponse[]>>({
      url: route.erp.list,
    });

    set({ erpList: response.data });
    return response;
  },
  async getRegionPolygon(): Promise<IBaseResponse<IRegionPolygonResponse[]>> {
    const response = await useApi.get<IBaseResponse<IRegionPolygonResponse[]>>({
      url: route.erp.region_polygon,
    });

    set({ regionPolygon: response.data });

    return response;
  },
  async getAreaPolygonPath(erp_id: string): Promise<IBaseResponse<IAreaPolygonPath>> {
    const response = await useApi.get<IBaseResponse<IAreaPolygonPath>>({
      url: route.erp.area_polygon_path.replace(':erp_id', erp_id)
    });

    if (response.data.file_path_en) {
      const responseFile = await useApi.get<IAreaPolygon[]>({ url: response.data.file_path_en});
      set({ selectedErpPolygon: responseFile });
    }

    return response;
  }
}))