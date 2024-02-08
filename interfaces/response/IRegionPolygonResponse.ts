interface IRegionPolygonResponse {
  district: string;
  type: string;
  coordinates: ICoordinate[];
  leafletLatLng?: any;
}

interface ICoordinate {
  lat: number;
  lng: number;
}