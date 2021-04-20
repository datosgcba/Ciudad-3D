# Descripción de Componentes 

La siguiente documentación muestra/identifica los parámetros y su estructura dentro de los **components**. Los comentarios se denominan *“description”*.

```bash
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

```


```bash

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

```

```bash
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
```

```bash

 "src\\components\\LayersBaseSwitch\\index.js": {
    "description": "Visualiza menu de diferentes capas",
    "displayName": "LayersBaseSwitch",
    "methods": []
  }
```

```bash

"src\\components\\Logo\\Logo.js": {
    "description": "Parámetros para visualizar logo del sitio",
    "methods": []
  }
}

```

```bash

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

```

```bash
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

```

```bash
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
```

```bash
  "src\\components\\Parcel\\index.js": {
    "description": "Visualiza parcela en la coordenada seleccionada",
    "displayName": "Parcel",
    "methods": []
  }

```

```bash
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

```

```bash
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
```

```bash
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
```

```bash
 "src\\components\\Sections\\SubSection\\Contact\\index.js": {
    "description": "Funcionamiento de contacto",
    "displayName": "Contact",
    "methods": []
  },

```

```bash
  "src\\components\\Sections\\SubSection\\Favorites\\index.js": {
    "description": "Funcionamiento de favoritos",
    "displayName": "Favorites",
    "methods": []
  },
```

```bash
  "src\\components\\Sections\\SubSection\\Information\\index.js": {
    "description": "Funcionamiento de Informacion",
    "displayName": "Information",
    "methods": []
  },

```

```bash

 "src\\components\\Sections\\SubSection\\Router\\Recents\\Places.js": {
    "description": "Lugares recientes y vista personalizada",
    "displayName": "Places",
    "methods": []
  },
```

```bash

  "src\\components\\Sections\\SubSection\\Router\\Recents\\Searches.js": {
    "description": "Búsqueda recientes",
    "displayName": "Searches",
    "methods": []
  },

```

```bash

  "src\\components\\Sections\\SubSection\\Router\\RouteOptions.js": {
    "description": "Opciones de rutas con diferentes Medios",
    "displayName": "RouteOptions",
    "methods": []
  },

```

```bash

  "src\\components\\Sections\\SubSection\\Router\\Serching.js": {
    "description": "Diseño de “Buscando” rutas",
    "methods": []
  },

```

```bash

  "src\\components\\Sections\\SubSection\\Router\\index.js": {
    "description": "Resultado de los diferentes medios de rutas y vista al mapa ",
    "displayName": "Router",
    "methods": []
  },

```

```bash

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

```

```bash

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
```

```bash

  "src\\components\\Sections\\SubSection\\ThematicMaps\\index.js": {
    "description": "Mediante los estados de categoría muestra el mapa con sus parámetros ",
    "displayName": "ThematicsMaps",
    "methods": []
  },

```

```bash

  "src\\components\\Sections\\index.js": {
    "description": "Vista de las sesiones (ThematicMaps/Information/Contact/Router/Favorites)",
    "displayName": "Section",
    "methods": []
  }

```

```bash

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

```

```bash

   "src\\components\\SideBar\\index.js": {
    "description": "Vista y personalización de la barra lateral con cambios de estado",
    "displayName": "ConnectedPanel",
    "methods": []
  }
}


```

```bash





