interface IRegionPolygonResponse {
  district: string;
  type: string;
  coordinates: ICoordinate[];
  leafletLatLng?: any;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}