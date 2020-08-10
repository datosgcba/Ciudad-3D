const url = process.env.REACT_APP_DJANGO_BASEURL

const templateDelitos = "<div class='feature_info'><b> {tipo}</b>  <br/> fecha: {fecha_lbl} <br/> hora: {hora_lbl} </div>"

const settings = {

  grupos: [
    {
      title: 'Delitos',
      color: '#2db093',
      help: '',
      expanded: false,
      filters: true, // solo para delitos
      layers: [
        {
          id: 'homicidio_doloso',
          title: 'Homicidio Doloso',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/homicidio_doloso/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#e74c3c',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#e74c3c'
            }
          }
        },
        {
          id: 'homicidio_segvial',
          title: 'Homocidio Seg Vial',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/homicidio_segvial/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': 'white',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#e74c3c'
            }
          }
        },
        {
          id: 'hurto_automotor',
          title: 'Hurto Automotor',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/hurto_automotor/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#f39c12',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#f39c12'
            }
          }
        },
        {
          id: 'hurto_sin_violencia',
          title: 'Hurto Sin Violencia',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/hurto_sin_violencia/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': 'white',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#f39c12'
            }
          }
        },
        {
          id: 'lesiones_segvial',
          title: 'Lesiones Seg Vial',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/lesiones_segvial/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': 'blue',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': 'blue'
            }
          }
        },
        {
          id: 'robo_automotor',
          title: 'Robo Automotor',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/robo_automotor/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#9b59b6',
              'circle-opacity': 0.8,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#9b59b6'
            }
          }
        },
        {
          id: 'robo_con_violencia',
          title: 'Robo Con Violencia',
          type: 'vectortile',
          displayPopup: true,
          popupContent: templateDelitos,
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/delitos/robo_con_violencia/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': 'white',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#9b59b6'
            }
          }
        }
      ]
    },
    {
      title: 'Edificación 3D',
      color: '',
      help: '',
      expanded: false,
      layers: [
        {
          id: 'edificios',
          title: 'Edificios',
          type: 'vectortile',
          displayPopup: true,
          popupContent: ' Altura: {altura} mts',
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/3d/tejido/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'fill-extrusion',
            paint: {
              'fill-extrusion-color': [
                'match',
                ['get', 'flagtipo'],
                'E', '#FFFFFF',
                'B', '#2EBC98',
                'B*', '#FCD73D',
                'T', '#F3A32D',
                '#ccc'
              ],
              'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'altura']
              ]
            }
          }
        }
      ]
    },
    {
      title: 'Cámaras',
      color: 'orange',
      help: '',
      expanded: false,
      layers: [
        {
          id: 'anillo_digital_lpr',
          title: 'Anillo digital lpr',
          type: 'vectortile',
          displayPopup: true,
          popupContent: '{camara}',
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/camaras/anillo_digital_lpr/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#1d1c1a',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#1d1c1a'
            }
          }
        },
        {
          id: 'camaras_cmu',
          title: 'Cámaras cmu',
          type: 'vectortile',
          displayPopup: true,
          popupContent: '{id}',
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/camaras/camaras_cmu/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#00b3e3',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#00b3e3'
            }
          }
        },
        {
          id: 'camaras_transferidas_de_PFA',
          title: 'Cámaras transferidas de PFA',
          type: 'vectortile',
          displayPopup: true,
          popupContent: '{id}',
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/camaras/camaras_transferidas_de_PFA/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#037dbf',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#037dbf'
            }
          }
        },
        {
          id: 'camara_tren_alerta_pfa',
          title: 'Cámara tren alerta PFA',
          type: 'vectortile',
          displayPopup: true,
          popupContent: '{id}',
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/camaras/camara_tren_alerta_pfa/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'circle',
            paint: {
              'circle-radius': 5,
              'circle-color': '#34485e',
              'circle-opacity': 0.5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#34485e'
            }
          }
        }
      ]
    },
    {
      title: 'Seguridad',
      color: 'blue',
      help: '',
      expanded: false,
      layers: [
        { id: 'comisarias.comisarias_vecinales', title: 'Comisarías Vecinales' },
        { id: 'comisarias.comisarias_comunales', title: 'Comisarías Comunales' },
        { id: 'cuarteles_de_bomberos.cuarteles_de_bomberos', title: 'Cuarteles de Bomberos' }
      ]
    },
    {
      title: 'Servicios',
      color: 'blue',
      help: '',
      expanded: false,
      layers: [
        /* {id:"embajadas_y_consulados.embajadas", title:"Embajadas"},
        {id:"embajadas_y_consulados.consulados", title:"Consulados"}, */
        { id: 'fiscalias.unidades_fiscales', title: 'Unidades Fiscales' }
      ]
    },
    {
      title: 'Salud',
      color: 'green',
      help: '',
      expanded: false,
      layers: [
        { id: 'centros_de_salud.centros_de_salud_y_accion_comunitaria', title: 'Centros de Salud y acción comunitaria' },
        { id: 'centros_de_salud.centros_medicos_barriales', title: 'Centros Médicos Barriales' },
        { id: 'hospitales.hospitales_de_ninos', title: 'Hospitales de Niños' },
        { id: 'hospitales.hospitales_especializados', title: 'Hospitales Especializados' },
        { id: 'hospitales.hospitales_generales_de_agudos', title: 'Hospitales Generales de Agudos' }
      ]
    },
    {
      title: 'Transporte',
      color: '',
      help: '',
      expanded: false,
      layers: [

      ]
    },
    {
      title: 'Educación',
      color: '#AAB714',
      help: '',
      expanded: false,
      layers: [
        { id: 'senderos_escolares.escuelas_en _senderos_gestion_estatal', title: 'Gestión Estatal' },
        { id: 'senderos_escolares.escuelas_en _senderos_gestion_privada', title: 'Gestión Privada' },
        { id: 'universidades.universidades', title: 'Universidades' },
        {
          id: 'senderos_seguros',
          title: 'Senderos Seguros',
          type: 'vectortile',
          displayPopup: true,
          popupContent: '{nombre}',
          options: {
            source: {
              type: 'vector',
              tiles: [`${url}/tiles/inventario/senderos_seguros/{z}/{x}/{y}.pbf`],
              minzoom: 10,
              maxzoom: 18,
              cluster: false
            },
            'source-layer': 'default',
            type: 'line',
            paint: {
              'line-width': 6,
              'line-color': '#008000',
              'line-opacity': 1
            }

          }
        }
      ]
    },
    {
      title: 'Urbanismo',
      color: '',
      help: '',
      expanded: false,
      layers: [
        { id: 'barrios.barrios', title: 'Barrios' }
      ]
    },
    {
      title: 'Turismo',
      color: '',
      help: '',
      expanded: false,
      layers: [

      ]
    },
    {
      title: 'Ciclovías',
      color: '',
      help: '',
      expanded: false,
      layers: [

      ]
    }

  ]
}

export default settings
