import proj4 from 'proj4'

proj4.defs([
  ['EPSG:221951', '+proj=tmerc +lat_0=-34.629269 +lon_0=-58.463300 +k=0.999998 +x_0=100000 +y_0=100000 +ellps=intl +units=m +no_defs'],
  ['EPSG:7433', '+proj=tmerc +lat_0=-34.629269 +lon_0=-58.463300 +k=0.999998 +x_0=100000 +y_0=100000 +ellps=intl +units=m +no_defs'],
  ['EPSG:97433', '+proj=tmerc +lat_0=-34.629269 +lon_0=-58.463300 +k=0.999998 +x_0=100000 +y_0=100085 +ellps=intl +units=m +no_defs']
]);

const wgs84 = "WGS84";
const origin = proj4("EPSG:7433");

export const Coords = {
  /**
   Convierte coordenadas GKBA en coordenadas geográficas WGS84
   @param {Array|usig.Punto|usig.Location|geolocation|Object} coords Coordenadas GKBA
   @return {Array|Object} Coordenadas WGS84
   */
  toLngLat: function(coords, returnObject) {
		const p = proj4(origin, wgs84, coords.x ? [parseFloat(coords.x), parseFloat(coords.y)] : coords);
		return returnObject ? {x: p[0], y: p[1]} : [p[1], p[0]];
  },

  /**
   Convierte coordenadas geográficas WGS84 en coordenadas GKBA
   @param {Array|usig.Punto|usig.Location|geolocation} coords Coordenadas geográficas WGS84
   @return {Array|Object} Coordenadas GKBA
   */
  toGkba: function(coords) {
    // Asumo que son 4326
    const p = proj4('EPSG:4326', 'EPSG:7433', coords);
    if (p[0]) return {x: p[0], y: p[1]};
    return p;
  }
}
