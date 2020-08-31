import config from '../appConfig';

/**
 * Se hacen consultas a los webServices de USIG y a EPOK, para obtener la informacion del
 * tooltip utilizado cuando se coloca un marker despues de la busqueda.
 */

// API urls
const epokUrl = "https://epok.buenosaires.gob.ar/saludcomunitaria/getAreasDeSalud/?";
const wsUrl =  "https://ws.usig.buenosaires.gob.ar/datos_utiles/?";

// Agrega el marker al mapa con el popup creado a partir de las consultas
async function addPopup(map, coords, title){
    const finalObject = await getPopUpInfo([coords.x,coords.y]);
    const div =  buildHtml(finalObject, title);
    console.log("Pasa por acá? sí", map)
    map.addMarker([coords.x, coords.y], true, false, true, true, true, {
        label: div.label,
        color: div.color
      })
     
}

// Consulta a los servicios
async function getPopUpInfo(point){
    const epokData = await fetch(`${epokUrl}x=${point[0]}&y=${point[1]}`)
        .then(res => res.json());
    const wsData = await fetch(`${wsUrl}x=${point[0]}&y=${point[1]}`)
    .then(res => res.json());
    return(buildObject(epokData,wsData));
}

// construye el html que va a ir dentro de el popup, con la informacion obtenida
// de las api de EPOK y UsigWebServices
const buildHtml = (data, title) => {  console.log(data.barrio)
    const div = 
    `<div class="feature_info">
        <h4>${title}</h4>
        <p><b>Área Hospitalaria: </b>${data.area_hospitalaria}</p>
        <p><b>Región Sanitaria: </b>${data.region_sanitaria}</p>
        <p><b>Área de Responsabilidad Territorial: </b>${data.areas_de_responsabilidad_territorial[0].nombre}</p>
        <p><b>Distrito Escolar: </b>${data.distrito_escolar}</p>
        <p><b>Comisaria Vecinal: </b>${data.comisaria_vecinal}</p>
        <p><b>Comuna: </b>${data.comuna}</p>
        <p><b> Barrio: </b>${data.barrio}</p> 
    </div>`
    const popupDiv = {
        label:div,
        color: config.defaultMarkerColor ? config.defaultMarkerColor : "#3FB1CE"
    } 
    return popupDiv;
}

// Une las 2 consultas en un solo objeto.
const buildObject = (epokData,wsData) => {
    const popUpInfo = Object.assign({}, wsData, epokData.resultado);
    return(popUpInfo);
}



export const tooltip = {
    getPopUpInfo : getPopUpInfo,
    addPopup : addPopup
}