import L from 'leaflet';
import { MapContainer, WMSTileLayer, ScaleControl } from 'react-leaflet';
import 'proj4';
import 'proj4leaflet';
import './Map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function EPSG2393() {
  const crsName = 'EPSG:2393';
  const projDef =
    '+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=3500000 +y_0=0 +ellps=intl +towgs84=-96.062,-82.428,-121.753,-4.801,-0.345,1.376,1.496 +units=m +no_defs +type=crs';

  const opts = {
    resolutions: [2207, 1103.5, 551.75, 275.875],
  };
  return new L.Proj.CRS(crsName, projDef, opts);
}
const crs = EPSG2393();
export default function Map() {
  const wmsOptions = { layers: 'world' }; // comma-separated string of any WMS layer(s) on the geoserver
  return (
    <MapContainer
      center={[65, 30]}
      zoom={0}
      maxZoom={3}
      crs={crs}
      scrollWheelZoom={true}
      continuousWorld={true}
      worldCopyJump={false}
    >
      <WMSTileLayer
        url="https://maps.omniscale.net/v2/demo/style.grayscale/map?epsg=2393"
        // params={wmsOptions}
      />
      <ScaleControl />
    </MapContainer>
  );
}
