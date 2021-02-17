#CUR 3D DOCUMENTACIÓN 
#v1.2 

Arquitectura de carpetas - API



###Arquitectura de carpetas 

El actual documento tiene como objetivo guiar paso a paso en la implementación del producto Cur3d, detallando brevemente cada carpeta de la misma.





###SRC

Fuente de la aplicación en el cual se encuentra todo el desarrollo Front-end.



##Components

En dicha sección se encuentran todos los componentes que interactúan con el usuario.


Estos 3 componentes son los que engloba toda la aplicación:

#Map: Es un contenedor del mapa generado por mapbox gl js a través de MapaInteractivoGL, el mini-mapa sirve para cambiar entre modo claro y oscuro.

#SideBar: Es un contenedor de Categories las cuales se obtienen desde appConfig.

#Sections: Cuando una Category es seleccionada este componente despliega el Section correspondiente. A su vez cada Section permite navegar entre los SubSection.




El resto de los componentes de la aplicación son:

#Categories: Identifica las diferentes categorías, los cambios de estado y estilos.

#FeatureInfo: Comunicación con la api de COMO LLEGO para la información de dirección normalizada.

#Logo: Imagen del sitio.

#Marker: Muestra en el mapa las marcas con latitud y longitud (color/estilo).

#MenuPlace: Visualiza el menú con interacciones “desde aquí”, “hasta aquí” y “más información” .

#Parcel: Visualiza en base a los polígonos/parcelas las capas en el mapa.

#Popup: Configuración para ventana emergente (popup).

#Route: Diferentes tipos de geometría para el marcado de ruta.

#RouteOptions: Con diferentes actores para seleccionar en el mapa (subte, caminando, vehículo, etc).

#Seeker: Es el autocompletado para el buscador, para la calle/altura, lugares, etc.











##Containers
El componente Home sirve de contenedor Map,SideBar y Sections.



##IMG
Almacen de todas las imágenes aplicadas al proyecto (.jpg .png).






##State

Son estados de los componentes que se modifican en tiempo real cuando hay cambios (categorías, rutas, coordenadas, buscador, etc). Su estructura  interna de carpetas y archivos está basada en:
[guía de estilos redux] https://redux.js.org/style-guide/style-guide
[patrón ducks] https://github.com/erikras/ducks-modular-redux



##Theme

Definiciones sobre los estilos a utilizar, procurando mantener dentro de lo posible los lineamientos de Material Design, pero tomando como prioridad el [diseño] (https://xd.adobe.com/view/2f060d90-f9de-445c-b939-f8f42d763eec-7a55/).

#index.js: Contiene las modificaciones sobre el tema de estilos material-ui por defecto.

#Wrappers: Componentes basados en material-ui.




##Utils

Contiene funciones útiles y transversales a las diferentes partes de la aplicación. Entre ellas las más importantes son:

#MapaInteractivoGL: Se encuentran partes vitales de la aplicación, desde aquí se puede acceder a mapbox gl js que es el corazón de la aplicación.

#mapBoxUtils: Principalmente funciones que retornan promesas a ser utilizadas por el middleware. Estas promesas suelen hacer uso de MapaInteractivoGL y Mapbox GL JS.

#configQueries: Sirve para desacoplar los componentes de la configuración de la aplicación.





###Documentación de components
La siguiente documentación muestra/identifica los parámetros y su estructura dentro del components. Los comentarios se denominan “description”.


"src\\components\\Categories\\Categories.js": {
    "description": "Identifica las diferentes categorías.",
    "displayName": "Categories",
    "methods": [],
    "props": {
      "data": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "object"
          }
        },
        "required": true,
        "description": "Selecciona la categoría."
      }
    }
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Categories\\Category.js": {
    "description": "Modifica las categorías mediante los estados.",
    "displayName": "Category",
    "methods": [],
    "props": {
      "id": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Parámetros de la categoría que busca."
      },
      "path": {
        "type": {
          "name": "objectOf",
          "value": {
            "name": "any"
          }
        },
        "required": true,
        "description": "Objeto de la categoría."
      },
      "title": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Parámetros del icono."
      }
    }
  }
}

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\FeatureInfo\\FeatureInfo.js": {
    "description": "Comunicación con la api de COMO LLEGO",
    "displayName": "FeatureInfo",
    "methods": [],
    "props": {
      "contenido": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "object"
          }
        },
        "required": false,
        "description": “Info de parámetros actuales",
        "defaultValue": {
          "value": "[]",
          "computed": false
        }
      },
      "direccionNormalizada": {
        "type": {
          "name": "string"
        },
        "required": false,
        "description": "Obtener dirección normalizada",
        "defaultValue": {
          "value": "''",
          "computed": false
        }
      }
    }
  }

 
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 "src\\components\\LayersBaseSwitch\\index.js": {
    "description": "Visualiza menu de diferentes capas",
    "displayName": "LayersBaseSwitch",
    "methods": []
  }

  
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


"src\\components\\Logo\\Logo.js": {
    "description": "Parámetros para visualizar logo del sitio",
    "methods": []
  }
}

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Map\\index.js": {
    "description": "Mapa para desplazar, zoom, long/lat",
    "displayName": "Map",
    "methods": [],
    "props": {
      "children": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "any"
          }
        },
        "required": true,
        "description": "Visualiza dirección, interactuar con el mapa y las capas"
      }
    }
  }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Marker\\index.js": {
    "description": "Marca de las coordenadas en el mapa",
    "displayName": "Marker",
    "methods": [],
    "props": {
      "coords": {
        "type": {
          "name": "objectOf",
          "value": {
            "name": "number"
          }
        },
        "required": true,
      },
      "color": {
        "type": {
          "name": "string"
        },
        "required": true,
       "description": "Parámetros de la coordenada que luego personaliza con color"
      }
    }
  }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\MenuPlace\\index.js": {
    "description": "Menu para mostrar las consultas en el mapa",
    "displayName": "MenuPlace",
    "methods": [],
    "props": {
      "coords": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "string"
          }
        },
        "required": true,
 "description": "Marcador en el lugar indicado y muestra info en dicho menú"
      }
    }
  }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Parcel\\index.js": {
    "description": "Visualiza parcela en la coordenada seleccionada",
    "displayName": "Parcel",
    "methods": []
  }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Popup\\index.js": {
    "description": "Ventana de info que se visualiza al realizar click al mapa ",
    "displayName": "Popup",
    "methods": [],
    "props": {
      "children": {
        "type": {
          "name": "objectOf",
          "value": {
            "name": "any"
          }
        },
        "required": true,
        "description": "Consulta al mapa interactivo y extrae los valores"
      },
      "coords": {
        "type": {
          "name": "objectOf",
          "value": {
            "name": "number"
          }
        },
        "required": true,
        "description": "Señala long/lat de coordenadas en dicha ventana"
      },
      "offset": {
        "type": {
          "name": "number"
        },
        "required": true,
      }
    }
  }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\ContainerBar.js": {
    "description": "Barra para personalizar el contenedor",
    "displayName": "ContainerBar",
    "methods": [],
    "props": {
      "children": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "any"
          }
        },
        "required": true,
        "description": "Usa todo el diseño disponible para la barra contenedor "
      },
      "type": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Parámetros para visualizar categoría"
      }
    }


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

"src\\components\\Sections\\HeaderSection.js": {
    "description": "Vista del encabezado",
    "displayName": "HeaderSection",
    "methods": [],
    "props": {
      "categoryTitle": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Títulos de las categorías"
      },
      "sectionTitle": {
        "type": {
          "name": "string"
        },
        "required": false,
        "description": "Personalización de tamaño fuente y desplazamiento con botón",
        "defaultValue": {
          "value": "''",
          "computed": false
        }
      },
      "info": {
        "type": {
          "name": "string"
        },
        "required": false,
        "description": "Parámetros de info que visualiza",
        "defaultValue": {
          "value": "''",
          "computed": false
        }
      }
    }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 "src\\components\\Sections\\SubSection\\Contact\\index.js": {
    "description": "Funcionamiento de contacto",
    "displayName": "Contact",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\Favorites\\index.js": {
    "description": "Funcionamiento de favoritos",
    "displayName": "Favorites",
    "methods": []
  },


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  "src\\components\\Sections\\SubSection\\Information\\index.js": {
    "description": "Funcionamiento de Informacion",
    "displayName": "Information",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 
 "src\\components\\Sections\\SubSection\\Router\\Recents\\Places.js": {
    "description": "Lugares recientes y vista personalizada",
    "displayName": "Places",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\Router\\Recents\\Searches.js": {
    "description": "Búsqueda recientes",
    "displayName": "Searches",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\Router\\RouteOptions.js": {
    "description": "Opciones de rutas con diferentes Medios",
    "displayName": "RouteOptions",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\Router\\Serching.js": {
    "description": "Diseño de “Buscando” rutas",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\Router\\index.js": {
    "description": "Resultado de los diferentes medios de rutas y vista al mapa ",
    "displayName": "Router",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\ThematicMaps\\InfoCard.js": {
    "description": "Tarjeta de info del mapa temático",
    "displayName": "InfoCard",
    "methods": [],
    "props": {
      "maps": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "string"
          }
        },
        "required": true,
        "description": "Parámetros de info titulo/descrip/color/mapa"
      },
      "title": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Info Titulo"
      },
      "description": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Info Descripción"
      },
      "color": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Info Color"
      }
    }
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\ThematicMaps\\Maps.js": {
    "description": "Lista de mapas con su checkbox",
    "displayName": "Maps",
    "methods": [],
    "props": {
      "name": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Verifica nombre"
      },
      "info": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Verifica info"
      },
      "iconUrl": {
        "type": {
          "name": "string"
        },
        "required": true,
        "description": "Verifica icono URL"
      },
      "groups": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "string"
          }
        },
        "required": true,
        "description": "Verifica grupo"
      },
      "references": {
        "type": {
          "name": "arrayOf",
          "value": {
            "name": "object"
          }
        },
        "required": true,
        "description": "Verifica referencias"
      }
    }
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\SubSection\\ThematicMaps\\index.js": {
    "description": "Mediante los estados de categoría muestra el mapa con sus parámetros ",
    "displayName": "ThematicsMaps",
    "methods": []
  },

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  "src\\components\\Sections\\index.js": {
    "description": "Vista de las sesiones (ThematicMaps/Information/Contact/Router/Favorites)",
    "displayName": "Section",
    "methods": []
  }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 "src\\components\\Seeker\\Seeker.js": {
    "description": "Autocompletado del buscador",
    "displayName": "Seeker",
    "methods": [],
    "props": {
      "onSelectItem": {
        "type": {
          "name": "func"
        },
        "required": true,
        "description": "Invoca la función para completar y dar sugerencia de los ingresado"
      }
    }

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   "src\\components\\SideBar\\index.js": {
    "description": "Vista y personalización de la barra lateral con cambios de estado",
    "displayName": "ConnectedPanel",
    "methods": []
  }
}


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





###API

Su origen se encuentra en cur3d\source\src\utils\apiConfig

const getParcel = ({ lng, lat }) => `${getApiUrl()}/catastro/parcela/?lng=${lng}&lat=${lat}`

const getParcelBySmp = (smp) => `${getApiUrl()}/catastro/parcela/?smp=${smp}`

const getGeometrical = (smp) => `${getApiUrl()}/catastro/geometria/?smp=${smp}`

const coordsToPlace = ({ lng, lat }) => `https://servicios.usig.buenosaires.gob.ar/normalizar/?lng=${lng}&lat=${lat}&minusculas=1`

const getCategoriesMaps = () => 'https://epok.buenosaires.gob.ar/mapainteractivoba/categorias/'

const getMaps = () => 'https://epok.buenosaires.gob.ar/mapainteractivoba/mapas/'

const getLayers = () => 'https://epok.buenosaires.gob.ar/mapainteractivoba/layers/'

const getTransp = ({ x, y }) => `https://recorridos.usig.buenosaires.gob.ar/2.0/info_transporte/?x=${x}&y=${y}`




