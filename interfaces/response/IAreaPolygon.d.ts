import type { ICoordinate } from './IRegionPolygonResponse';

interface IAreaPolygon {
  id: Number;
  area_id: string;
  name: string;
  sub_area_id: string;
  sub_area_name: string | null;
  shape_area: Number;
  coordinates: ICoordinate[];
  is_recovered: boolean;
  region_name: string;
  recovery_duration: string;
  percentage: string;
  total_account: Number;
  is_selected: null;
  color: string;
  wr_status: null;
  wr_color: null;
  leafletLatLng?: Number[] | Number[][] | Number[][][] | null;
}
