import {
  UPDATE_MAP,
  ADD_LAYER,
  TOGGLE_LAYER,
  INIT_MAP,
  TOGGLE_SECTION,
  TEST
} from "../constants/action-types";
import config from "../../config";

/* probablemente no esté bueno gestionar una instancia de un objecto acá
    Para que se entienda mejor:

    mapaGL es la instancia de mapainteractivoGL
    map es la instancia de mapbox dentro de mapainteractivoGL (mapaGL)
   */

const initialState = {
  loading: true,
  mapaGL: null,
  data: null,
  sectionOpen: false
}

const addLayer = (layer, mapaGL) => {
  if (layer.type && (layer.type === "vectortile" || layer.type === "custom")) {
    let options = { ...layer.options };
    options.id = layer.id;
    //console.log(mapaGL);
    mapaGL.addVectorTileLayer(
      options,
      null,
      layer.displayPopup,
      layer.popupContent
    );
  } else {
    mapaGL.addPublicLayer(layer.id, { clustering: true });
  }
};

const toggleLayer = (layer, mapaGL) => {
  const { map } = mapaGL;

  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, "visibility");
    if (typeof visibility === "undefined" || visibility === "visible") {
      map.setLayoutProperty(layer.id, "visibility", "none");
    } else {
      map.setLayoutProperty(layer.id, "visibility", "visible");
    }
  } else {
    addLayer(layer, mapaGL);
  }
};

const initMap = mapaGL => {
  const { map } = mapaGL;
  map.on("load", function() {
    loadCustomImages(mapaGL);
    loadDefaultLayers(mapaGL);
  });
};


const loadDefaultLayers = mapaGL => {
  //las capas se agregan cuando se termina de crear el mapa
  //console.log("Prendiendo las capas habilitadas por default");
  config.grupos.map(g =>
    g.layers.forEach(layer => {
      if (layer.enabled) {
        addLayer(layer, mapaGL);
      }
    })
  );
};

const loadCustomImages = mapaGL => {
  //mapbox necesita que se agreguen las capas para referenciarlas por id
  //console.log("Cargando los iconos customizados");
  const { customIcons } = config;
  const { map } = mapaGL;
 
  customIcons.map(icon => {
    map.loadImage(icon.data, function(error, image) {
      if (error) throw error;
      map.addImage(icon.id, image);
    });
  });
};

const reducer = (state = initialState, action) => { // enviar el config junto al state(mapaGL)
  if (action.type === UPDATE_MAP) {
    return Object.assign({}, state, {
      mapaGL: action.payload
    });
  }

  if (action.type === INIT_MAP) {
    const { mapaGL } = state;
    initMap(mapaGL);
    return state;
  }

  if (action.type === ADD_LAYER) {
    const layer = action.payload;
    const { mapaGL } = state;
    addLayer(layer, mapaGL);
    return state;
  }

  if (action.type === TOGGLE_LAYER) {
    const layer = action.payload;
    const { mapaGL } = state;
    toggleLayer(layer, mapaGL);
    return state;
  }

  if (action.type === TOGGLE_SECTION) {
    return Object.assign({}, state, {
      sectionOpen: !state.sectionOpen
    })
  }

  if (action.type === TEST) {
    return {...state, data: action.payload}
  }  

  return state;
};

export default reducer;
