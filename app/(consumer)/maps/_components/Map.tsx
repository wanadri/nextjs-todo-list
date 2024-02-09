import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useErpStore } from "@/store/erp"
import type { PathOptions } from 'leaflet';
import { type LatLngExpression } from 'leaflet';

function Map(props: any) {
  const { centerPosition = [3.291716, 101.479177], zoom = 10 } = props
  const regionPolygons = useErpStore((state) => state.getLeafletPolygon());
  const areaRecoveredPolygons: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = useErpStore((state) => state.getRecoveredAreaPolygon());
  const areaNotRecoveredPolygons: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = useErpStore((state) => state.getNotRecoveredAreaPolygon());
  const areaLowPressurePolygons: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = useErpStore((state) => state.getLowPressureAreaPolygon());

  const regionOptions: PathOptions = {
    color: 'gray',
    fillOpacity: 0,
  }
  const areaNotRecoveredOptions: PathOptions = {
    color: 'red',
  }
  const areaRecoveredOptions: PathOptions = {
    color: 'green',
  }
  const areaLowPressureOptions: PathOptions = {
    color: 'yellow',
  }

  return (
    <MapContainer
      center={centerPosition}
      zoom={zoom}
      zoomControl={false}
      attributionControl={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        { regionPolygons.length && (
            regionPolygons.map((region: any, index: any) => (
              <Polygon key={index} positions={region.leafletLatLng} pathOptions={regionOptions}></Polygon>
            ))
        )}
        { areaNotRecoveredPolygons.length && (
            areaNotRecoveredPolygons.map((area: any, index: any) => (
              <Polygon
                key={index}
                positions={area.leafletLatLng}
                pathOptions={areaNotRecoveredOptions}>
                <Popup>
                  {area.name}
                </Popup>
              </Polygon>
            ))
        )}
        { areaRecoveredPolygons.length && (
            areaRecoveredPolygons.map((area: any, index: any) => (
              <Polygon
                key={index}
                positions={area.leafletLatLng}
                pathOptions={areaRecoveredOptions}>
                <Popup>
                  {area.name}
                </Popup>
              </Polygon>
            ))
        )}
        { areaLowPressurePolygons.length && (
            areaLowPressurePolygons.map((area: any, index: any) => (
              <Polygon
                key={index}
                positions={area.leafletLatLng}
                pathOptions={areaLowPressureOptions}>
                <Popup>
                  {area.name}
                </Popup>
              </Polygon>
            ))
        )}
    </MapContainer>
  )
}

export default Map