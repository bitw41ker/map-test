import L from 'leaflet';
import { MapContainer, TileLayer, ScaleControl } from 'react-leaflet';
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
const apikey = process.env.REACT_APP_MMLAPI;

function EPSG2393() {
  const crsName = 'EPSG:3067';
  const projDef =
    '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs';

  const opts = {
    origin: [-548576, 8388608],
    bounds: L.bounds([-548576, 8388608], [1548576, 6291456]),
    resolutions: [8192, 4096, 2048, 1024, 512, 256, 128, 64],
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
      maxZoom={7}
      crs={crs}
      scrollWheelZoom={true}
      continuousWorld={true}
      worldCopyJump={false}
    >
      <TileLayer
        url={`https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/taustakartta/default/ETRS-TM35FIN/{z}/{y}/{x}.png?api-key=${apikey}`}
      />
      <ScaleControl />
    </MapContainer>
  );
}
