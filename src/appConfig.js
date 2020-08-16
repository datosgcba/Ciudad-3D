/*
  Importante acceder a las configuraciones utilizando utils/configQueries
*/

// geojson local: es importante que la extension del archivo sea .json
import React from 'react'

import Capa from 'components/Sections/SubSection/Capa'
import Contact from 'components/Sections/SubSection/Contact'
import Explorar from 'components/Sections/SubSection/Explorer'
import Information from 'components/Sections/SubSection/Information'

const geojson_hoteles = require('data/hoteles.geojson')

const DJANGO_MEDIA_URL = `${process.env.REACT_APP_DJANGO_BASEURL}/media/data/`

// const DJANGO_MEDIA_URL = 'https://bamapas.usig.buenosaires.gob.ar/media/data/';

// const DJANGO_MEDIA_URL = 'http://bamapas-test.eastus2.cloudapp.azure.com/media/data/';

// const geojson_ufus = require("./data/ufus.geojson");
// const geojson_vacunacion = require("./data/vacunacion.geojson");
// const geojson_autoridades_varon = require("./data/autoridades_varon.geojson");
// const geojson_autoridades_mujer = require("./data/autoridades_mujer.geojson");
// const geojson_empleados_varon = require("./data/empleados_varon.geojson");
// const geojson_empleadas_mujer = require("./data/empleadas_mujer.geojson");
// const geojson_licencia = require("./data/licencia.geojson");
// const geojson_hospitales = require("./data/hospitales.geojson");
// const geojson_barrios_vulnerables = require("./data/barrios_vulnerables.geojson");
// const geojson_centros_barriales = require("./data/centros_barriales.geojson");
// const geojson_bancos = require("./data/bancos.geojson");
// const geojson_farmacias = require("./data/farmacias.geojson");
// const geojson_farmacias_prioritarias = require("./data/farmacias_prioritarias.geojson");
// const geojson_pago_facil = require("./data/pago_facil.geojson");
// const geojson_puntos_comunas = require("./data/puntos_comunas.geojson");
// const geojson_pacientes_empleados = require("./data/pacientes_empleados.geojson");
// const geojson_prueba_extrusion = require("./data/prueba_extrusion.geojson");

// Imagenes de los logos (en el caso de barrios vulnerables es un rectangulo de color solido)
const imgUfus = require('img/ufus.png')
const imgHoteles = require('img/hoteles.png')
const imgVacunacion = require('img/vacunacion.png')
const imgHA = require('img/hosp_agudos.png')
const imgHE = require('img/hosp_especializados.png')
const imgHN = require('img/hosp_ninos.png')
const imgCesac = require('img/cesac.png')
const imgCentro_barrial = require('img/centro_barrial.png')
const imgVulnerables = require('img/vulnerables.png')
const imgEmpleados_varon = require('img/empleados_varon.png')
const imgEmpleadas_mujer = require('img/empleadas_mujer.png')
const imgAutoridades_varon = require('img/autoridades.png')
const imgAutoridades_mujer = require('img/autoridades_mujer.png')
const imgLicencia = require('img/licencia.png')
const imgBancos = require('img/bancos.png')
const imgFarmacias = require('img/farmacias.png')
const imgPagoFacil = require('img/pago_facil.png')
const imgPuntosComunas = require('img/puntos_comunas.png')
const imgEstacionesFFCC = require('img/estacion_ffcc.png')
const imgAccesoBuses = require('img/acceso_buses.png')
const imgComerciales = require('img/comerciales.png')

// Links de descarga BADATA
const badata = {
  ufus: 'https://data.buenosaires.gob.ar/dataset/unidades-febriles-de-urgencia',
  hosp_agudos: 'https://data.buenosaires.gob.ar/dataset/hospitales',
  cesac:
    'https://data.buenosaires.gob.ar/dataset/centros-salud-accion-comunitaria-cesac',
  centro_vacunacion:
    'https://data.buenosaires.gob.ar/dataset/vacunatorios-adultos-mayores',
  hoteles: null,
  barrios_vulnerables: null
}

// plantillas de popup para capas custom

const plantilla_hoteles = '<h3>Hoteles</h3><b>Nombre:</b> {nombre} <br> <b>Domicilio:</b> {domicilio}'

const plantilla_bancos = '<h3>Bancos</h3><b>Nombre:</b> {nombre} <br> <b>Domicilio:</b> {domicilio}'

const plantilla_analisis = '<h3>Análisis por radio censal</h3><b>Adultos mayores:</b> {pacientes} <br> <b>Empleados GCBA:</b> {empleados}<br><b>Relación Adultos Mayores - Empleados GCBA:</b> {pacientes_empleados}'

const plantilla_autoridades = '<h3>Autoridades GCBA</h3><b>Nombre:</b> {nombre} {apellido} <br> <b>Repartición:</b> {reparticion}'
const plantilla_empleados = '<h3>Empleados GCBA</h3><b>Nombre:</b> {nombre} {apellido} <br> <b>Repartición:</b> {reparticion}'

const plantilla_popup_ufus = '<h3>UFUS</h3><b>Nombre:</b> {nombre}'
const plantilla_farmacias_prioritarias = '<h3>Farmacia</h3><b>Nombre:</b> {Cadena}'
const plantilla_farmacias = '<h3>Farmacia</h3><b>Nombre:</b> {Nombre}'
const plantilla_barrios_vulnerables = '<h3>Barrios vulnerables</h3><b>Nombre:</b> {nombre}'

const plantilla_zonas_comerciales = '<h3>Zona comercial {nombre}</h3>'
const plantilla_corredores_comerciales = '<h3>Corredor comercial {comercial}</h3><b>'
const plantilla_centro_de_trasbordo = '<h3>Centro de Trasbordo {nombre}</h3>'
const plantilla_control_accesos_buses = '<h3>Control de acceso a Buses {Nombre}</h3>'
const plantilla_estaciones_ffcc = '<h3>Estación de tren clausurada {nombre}</h3><b>Línea:</b> {linea}'

// const plantilla_popup_vacunacion = "<h3>Centros de vacunación adultos mayores</h3><br><b>Nombre:</b> {Nombre} //<br> <b>Tipo:</b> {tipo}<br> <b>Domicilio:</b> {domicilio}";

const config = {
  defaultMarkerColor: '#FF9A17', // color del marker del buscador
  customIcons: [
    {
      id: 'imagen_ufus',
      data: imgUfus
    },
    {
      id: 'imagen_hoteles',
      data: imgHoteles
    },
    {
      id: 'imagen_centro_barrial',
      data: imgCentro_barrial
    },
    {
      id: 'imagen_vacunacion',
      data: imgVacunacion
    },
    {
      id: 'imagen_bancos',
      data: imgBancos
    },
    {
      id: 'imagen_farmacias',
      data: imgFarmacias
    },
    {
      id: 'imagen_pago_facil',
      data: imgPagoFacil
    },
    {
      id: 'imagen_puntos_comunas',
      data: imgPuntosComunas
    },
    {
      id: 'imagen_accesos_buses',
      data: imgAccesoBuses
    },
    {
      id: 'imagen_estaciones_ffcc',
      data: imgEstacionesFFCC
    }
  ],
  grupos: [
    {
      title: 'Personal GCBA',
      private: true,
      color: '#ffffff', // amarillo
      help:
        'Personal del GCBA que no está de licencia y no pertenece a un área esencial',
      layers: [
        {
          id: 'autoridades_varones',
          private: true,
          type: 'custom',
          title: 'Autoridades varones',
          displayPopup: true,
          popupContent: plantilla_autoridades,
          icon: imgAutoridades_varon,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_autoridades_varon
              data: `${DJANGO_MEDIA_URL}autoridades_varon.geojson`
            },
            type: 'circle',
            paint: {
              'circle-color': '#f180f7',
              'circle-radius': 3,
              'circle-stroke-color': 'black',
              'circle-stroke-width': 1
            }
          }
        },
        {
          id: 'autoridades_mujeres',
          private: true,
          type: 'custom',
          title: 'Autoridades mujeres',
          displayPopup: true,
          popupContent: plantilla_autoridades,
          icon: imgAutoridades_mujer,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_autoridades_mujer
              data: `${DJANGO_MEDIA_URL}autoridades_mujer.geojson`
            },
            type: 'circle',
            paint: {
              'circle-color': '#4bb611',
              'circle-radius': 3,
              'circle-stroke-color': 'black',
              'circle-stroke-width': 1
            }
          }
        },
        {
          id: 'empleados_varon',
          private: true,
          type: 'custom',
          title: 'Empleados varones',
          displayPopup: true,
          popupContent: plantilla_empleados,
          icon: imgEmpleados_varon,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_empleados_varon
              data: `${DJANGO_MEDIA_URL}empleados_varon.geojson`
            },
            type: 'circle',
            paint: {
              'circle-color': '#faa639',
              'circle-radius': 3,
              'circle-stroke-color': 'black',
              'circle-stroke-width': 1
            }
          }
        },
        {
          id: 'empleadas_mujer',
          private: true,
          type: 'custom',
          title: 'Empleadas mujeres',
          displayPopup: true,
          popupContent: plantilla_empleados,
          icon: imgEmpleadas_mujer,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_empleadas_mujer
              data: `${DJANGO_MEDIA_URL}empleadas_mujer.geojson`
            },
            type: 'circle',
            paint: {
              'circle-color': '#08b0f9',
              'circle-radius': 3,
              'circle-stroke-color': 'black',
              'circle-stroke-width': 1
            }
          }
        },
        {
          id: 'licencia',
          private: true,
          type: 'custom',
          title: 'Personal bajo licencia',
          displayPopup: true,
          popupContent: plantilla_empleados,
          icon: imgLicencia,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_licencia
              data: `${DJANGO_MEDIA_URL}licencia.geojson`
            },
            type: 'circle',
            paint: {
              'circle-color': '#fbe936',
              'circle-radius': 3,
              'circle-stroke-color': 'black',
              'circle-stroke-width': 1
            }
          }
        }
      ]
    },
    // 1) este grupo usa capas de epok, se agregan según su id y
    // se visualizan de acuerdo a la config de epok
    {
      title: 'Salud',
      color: 'red',
      help: 'Establecimientos de salud',
      layers: [
        {
          id: 'UFU.UFU',
          private: false,
          type: 'public',
          title: 'UFUS',
          enabled: false,
          icon: imgUfus,
          link: badata.ufus
        },
        {
          id: 'homicidio_doloso',
          title: 'Homicidio Doloso',
          type: 'vectortile',
          displayPopup: true,
          options: {
            source: {
              type: 'vector',
              tiles: ['http://seguridad.eastus2.cloudapp.azure.com/tiles/delitos/homicidio_doloso/{z}/{x}/{y}.pbf'],
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
          id: 'hospitales.hospitales_generales_de_agudos',
          private: false,
          title: 'Hospitales',
          type: 'geojson',
          options: {
            source: {
              type: 'geojson',
              // data: geojson_hospitales
              data: `${DJANGO_MEDIA_URL}hospitales.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_vacunacion', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          },
          enabled: false,
          icon: imgHA
        },
        {
          id: 'centros_de_salud.centros_de_salud_y_accion_comunitaria',
          private: false,
          title: 'CESAC',
          type: 'public',
          enabled: false,
          icon: imgCesac,
          link: badata.cesac
        },
        {
          id:
            'vacunatorio_adulto_mayor_emergencia.vacunatorio_adulto_mayor_emergencia',
          private: false,
          title: 'Centros vacunación adultos mayores',
          type: 'public',
          icon: imgVacunacion,
          link: badata.centro_vacunacion,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_vacunacion
              data: `${DJANGO_MEDIA_URL}vacunacion.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_vacunacion', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        }
      ]
    },
    {
      title: 'Análisis',
      color: '#ffffff', // amarillo
      private: true,
      help:
        'Adultos mayores atendidos por el sistema público de salud. Amarillo: mejor relación, rojo: menos empleados para asisitir a adultos mayores',
      layers: [
        {
          id: 'pacientes_empleados',
          private: true,
          type: 'custom',
          title: 'Relación adultos mayores - empleados',
          displayPopup: true,
          popupContent: plantilla_analisis,
          icon: imgVulnerables,
          options: {
            type: 'fill',
            source: {
              type: 'geojson',
              // data: pacientes_empleados
              data: `${DJANGO_MEDIA_URL}pacientes_empleados.geojson`
            },
            paint: {
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'pacientes_empleados'],
                0,
                '#ffffb2',
                4.5,
                '#fecc5c',
                8.6,
                '#fd8d3c',
                17.5,
                '#f03b20',
                32,
                '#bd0026'
              ],
              'fill-opacity': 0.8
            }
          }
        }
      ]
    },
    {
      title: 'Equipamientos',
      private: true,
      color: '#ffffff', // amarillo
      help: 'Establecimientos de servicios esenciales',
      layers: [
        {
          id: 'bancos',
          private: false,
          type: 'custom',
          title: 'Bancos',
          displayPopup: true,
          popupContent: plantilla_bancos,
          icon: imgBancos,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_bancos
              data: `${DJANGO_MEDIA_URL}bancos.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_bancos', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        },
        {
          id: 'farmacias_prioritarias',
          private: true,
          type: 'custom',
          title: 'Farmacias prioritarias',
          displayPopup: true,
          popupContent: plantilla_farmacias_prioritarias,
          icon: imgFarmacias,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_farmacias_prioritarias
              data: `${DJANGO_MEDIA_URL}farmacias_prioritarias.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_farmacias', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        },
        {
          id: 'otras_farmacias',
          private: true,
          type: 'custom',
          title: 'Otras farmacias',
          displayPopup: true,
          popupContent: plantilla_farmacias,
          icon: imgFarmacias,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_farmacias
              data: `${DJANGO_MEDIA_URL}farmacias.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_farmacias', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        },
        {
          id: 'pago_facil',
          private: false,
          type: 'custom',
          title: 'Pago Fácil',
          displayPopup: true,
          popupContent: plantilla_hoteles,
          icon: imgPagoFacil,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_pago_facil
              data: `${DJANGO_MEDIA_URL}pago_facil.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_pago_facil', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        },
        {
          id: 'puntos_comunas',
          private: true,
          type: 'custom',
          title: 'Puntos Comuna',
          displayPopup: true,
          popupContent: plantilla_hoteles,
          icon: imgPuntosComunas,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_puntos_comunas
              data: `${DJANGO_MEDIA_URL}puntos_comunas.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_puntos_comunas', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        }
      ]
    },
    {
      title: 'Alojamientos',
      color: '#ffffff', // amarillo
      help:
        'Hoteles destinados al alojamiento temporarios de aislamiento preventivo de viajeros',
      layers: [
        {
          id: 'alojamiento',
          private: false,
          type: 'custom',
          title: 'Hoteles',
          displayPopup: true,
          popupContent: plantilla_hoteles,
          icon: imgHoteles,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_hoteles
              data: `${DJANGO_MEDIA_URL}hoteles.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_hoteles', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        },
        {
          id: 'centro_barrial',
          private: true,
          type: 'custom',
          title: 'Centros Barriales',
          displayPopup: true,
          popupContent: plantilla_hoteles,
          icon: imgCentro_barrial,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_centros_barriales
              data: `${DJANGO_MEDIA_URL}centros_barriales.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_centro_barrial', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        }
      ]
    },
    {
      title: 'Comercio',
      color: 'blue',
      help: 'Villas, asentamientos y barrios vulnerables',
      layers: [
        {
          id: 'zonas_comerciales',
          private: false,
          type: 'custom',
          title: 'Zonas comerciales restringidas',
          enabled: false,
          displayPopup: true,
          popupContent: plantilla_zonas_comerciales,
          icon: imgComerciales,
          options: {
            source: {
              type: 'geojson',
              data: `${DJANGO_MEDIA_URL}zonas_comerciales.geojson`
            },
            type: 'fill',
            paint: {
              'fill-color': '#b37cfa',
              'fill-opacity': 0.5
            }
          }
        },
        {
          id: 'corredores_lineales',
          private: false,
          type: 'custom',
          title: 'Corredores comerciales restringidos',
          enabled: false,
          displayPopup: true,
          popupContent: plantilla_corredores_comerciales,
          icon: imgComerciales,
          options: {
            source: {
              type: 'geojson',
              data: `${DJANGO_MEDIA_URL}corredores_lineales.geojson`
            },
            type: 'line',
            paint: {
              'line-color': '#b37cfa',
              'line-width': 4
            }
          }
        }
      ]
    },
    {
      title: 'Transporte',
      color: 'blue',
      help: 'Villas, asentamientos y barrios vulnerables',
      layers: [
        {
          id: 'centro_de_trasbordo',
          private: false,
          type: 'custom',
          title: 'Centros de Trasbordo',
          enabled: false,
          displayPopup: true,
          popupContent: plantilla_centro_de_trasbordo,
          icon: imgVulnerables,
          options: {
            source: {
              type: 'geojson',
              data: `${DJANGO_MEDIA_URL}centros_de_trasbordo_poligono.geojson`
            },
            type: 'fill',
            paint: {
              'fill-color': '#faa639',
              'fill-opacity': 0.5
            }
          }
        },
        {
          id: 'estaciones_ffcc_cerradas',
          private: false,
          type: 'custom',
          title: 'Estaciones FFCC cerradas',
          enabled: false,
          displayPopup: true,
          popupContent: plantilla_estaciones_ffcc,
          icon: imgEstacionesFFCC,
          options: {
            source: {
              type: 'geojson',
              data: `${DJANGO_MEDIA_URL}estaciones_ffcc.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_estaciones_ffcc', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        },
        {
          id: 'accesos_bus',
          private: false,
          type: 'custom',
          title: 'Control accesos buses',
          enabled: false,
          displayPopup: true,
          popupContent: plantilla_control_accesos_buses,
          icon: imgAccesoBuses,
          options: {
            source: {
              type: 'geojson',
              data: `${DJANGO_MEDIA_URL}puntos_acceso_bus.geojson`
            },
            type: 'symbol',
            layout: {
              'icon-image': 'imagen_accesos_buses', // tiene que coincidir con el id de customIcons
              'icon-size': 0.6,
              'icon-allow-overlap': true
            }
          }
        }
      ]
    },
    {
      title: 'Barrios vulnerables',
      color: 'blue',
      help: 'Villas, asentamientos y barrios vulnerables',
      layers: [
        {
          id: 'zonas_vulnerables',
          private: false,
          type: 'custom',
          title: 'Barrios vulnerables',
          displayPopup: true,
          popupContent: plantilla_barrios_vulnerables,
          icon: imgVulnerables,
          link: badata.barrios_vulnerables,
          options: {
            source: {
              type: 'geojson',
              // data: geojson_barrios_vulnerables
              data: `${DJANGO_MEDIA_URL}barrios_vulnerables.geojson`
            },
            type: 'fill',
            paint: {
              'fill-color': '#f2ac1f',
              'fill-opacity': 0.6
            }
          }
        }
      ]
    }
  ],
  categorias: [
    {
      id: 'Information',
      title: 'Información',
      path: <svg id="info" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><g id="Grupo_45" data-name="Grupo 45"><path id="Trazado_13" data-name="Trazado 13" d="M23.9,4.1A14,14,0,0,0,4.1,23.9,14,14,0,0,0,23.9,4.1ZM14,3.828a3.008,3.008,0,1,1-3.008,3.008A3.011,3.011,0,0,1,14,3.828Zm3.828,19.141H10.172V21.328h1.641v-8.2H10.172V11.484h6.016v9.844h1.641Z" fill="#d9d9d9" /></g></svg>,
      component: Information
    },
    {
      id: 'Capa',
      title: 'Capa',
      path: <svg xmlns="http://www.w3.org/2000/svg" width="35.333" height="32.266" viewBox="0 0 35.333 32.266">
        <g id="Grupo_50" data-name="Grupo 50" transform="translate(-567.5 -127.979)">
          <circle id="Elipse_3" data-name="Elipse 3" cx="1.458" cy="1.458" r="1.458" transform="translate(583.708 134.708)" fill="#d9d9d9" />
          <path id="Trazado_16" data-name="Trazado 16" d="M590.75,142.594l-.742-.364a12.77,12.77,0,0,0,2.659-7.179c0-5.45-5.092-7.009-7.831-7.072-2.692.063-7.784,1.622-7.784,7.072a9.669,9.669,0,0,0,.363,2.54l-9.915,4.957v17.7l11.512-4.671,11.81,4.491,12.011-4.276V137.774Zm-5.917-12.615c.239.006,5.834.22,5.834,5.072,0,4.347-4.215,8.487-5.827,9.91-1.6-1.422-5.788-5.552-5.788-9.91C579.052,130.2,584.647,129.985,584.833,129.979Zm-7,23.915-8.333,3.381v-13.49l8.333-4.167ZM590,157.613l-10.167-3.866V142.429a25.059,25.059,0,0,0,4.391,4.629l.613.481.616-.479a25.166,25.166,0,0,0,3.3-3.219l1.25.613Zm10.833-3.235L592,157.523V144.249l8.833-3.523Z" fill="#d9d9d9" />
        </g>
      </svg>,
      component: Capa
    },
    {
      id: 'Explorer',
      title: 'Explorar',
      path: <svg xmlns="http://www.w3.org/2000/svg" width="29.33" height="29.33" viewBox="0 0 29.33 29.33">
        <g id="Grupo_49" data-name="Grupo 49" transform="translate(-638.167 -130.25)">
          <circle id="Elipse_2" data-name="Elipse 2" cx="1.458" cy="1.458" r="1.458" transform="translate(651.374 143.606)" fill="#d9d9d9" />
          <g id="Grupo_46" data-name="Grupo 46" transform="translate(638.167 130.25)"><path id="Trazado_14" data-name="Trazado 14" d="M652.832,159.58A14.665,14.665,0,1,1,667.5,144.915,14.681,14.681,0,0,1,652.832,159.58Zm0-27.516a12.851,12.851,0,1,0,12.851,12.851A12.865,12.865,0,0,0,652.832,132.064Z" transform="translate(-638.167 -130.25)" fill="#d9d9d9" /></g>
          <g id="Grupo_47" data-name="Grupo 47" transform="translate(644.613 136.984)"><path id="Trazado_15" data-name="Trazado 15" d="M647.083,154.5a1,1,0,0,1-.94-1.34l3.917-10.833a1,1,0,0,1,.645-.616l10.25-3.167a1,1,0,0,1,1.252,1.245l-3.167,10.5a1,1,0,0,1-.654.664l-11,3.5A.987.987,0,0,1,647.083,154.5Zm4.688-11.025-3.058,8.457,8.564-2.725,2.473-8.2Z" transform="translate(-646.083 -138.5)" fill="#d9d9d9" /></g>
        </g>
      </svg>,
      component: Explorar,
      options: [
        {
          id: 'Altura',
          title: 'Altura código urbanístico',
          items: []
        },
        {
          id: 'Area',
          title: 'Área especial individualizada',
          items: []
        },
        {
          id: 'Mixtura',
          title: 'Mixtura de uso',
          items: []
        },
        {
          id: 'Barrio',
          title: 'Barrio',
          items: [
            'Agronomía', 'Almagro', 'Balvanera', 'Barras', 'Belgrano', 'Boca', 'Boedo', 'Cabalito',
            'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores', 'Floresta', 'Liniers',
            'Mataderos', 'Monserrat', 'Monte Castro', 'Nueva Pompeya', 'Nuñez', 'Palermo', 'Parque Avellaneda'
          ]
        }
      ]
    },
    {
      title: 'Contacto',
      path: <svg xmlns="http://www.w3.org/2000/svg" width="19.547" height="20.787" viewBox="0 0 19.547 20.787">
        <g id="Grupo_48" data-name="Grupo 48" transform="translate(-51.076 -679.996)">
          <line id="Línea_4" data-name="Línea 4" x1="9.202" transform="translate(56.248 686.855)" fill="none" stroke="#a8a8a8" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.688" />
          <line id="Línea_5" data-name="Línea 5" x1="9.202" transform="translate(56.248 690.654)" fill="none" stroke="#a8a8a8" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.688" />
          <path id="Trazado_12" data-name="Trazado 12" d="M51.919,699.94l5.791-4.186H69.779V680.84H51.919Z" fill="none" stroke="#a8a8a8" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.688" />
        </g>
      </svg>,
      component: Contact
    }
  ],
  subSection: [
    {
      title: 'Visualizar',
      component: Contact
    }
  ]
}

export default config
