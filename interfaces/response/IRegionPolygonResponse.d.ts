interface IRegionPolygonResponse {
  district: string;
  type: string;
  coordinates: ICoordinate[];
  leafletLatLng?: Number[] | Number[][] | Number[][][] | null;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}