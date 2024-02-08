import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useErpStore } from "@/store/erp"
import type { PathOptions } from 'leaflet';
import { type LatLngExpression } from 'leaflet';

function Map(props: any) {
  const { centerPosition = [3.291716, 101.479177], zoom = 10 } = props
  const regionPolygons: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = useErpStore((state) => state.getLeafletPolygon());
  const areaPolygons: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = useErpStore((state) => state.getAreaPolygon());

  const regionOptions: PathOptions = {
    color: 'gray',
    fillOpacity: 0,
  }
  const areaOptions: PathOptions = {
    color: 'red',
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
        <Polygon positions={regionPolygons} pathOptions={regionOptions}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Polygon>
        {
          areaPolygons.length && (
            <Polygon positions={areaPolygons} pathOptions={areaOptions}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Polygon>
          )
        }
    </MapContainer>
  )
}

export default Map