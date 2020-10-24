const config = {
  defaultMarkerColor: '#FF9A17',
  customIcons: [],
  icons: {
    iconoResidencia: 'Link o img en base 64',
    iconoComercio: 'Link o img en base 64',
    iconoServicio: 'Link o img en base 64',
    iconoDepositos: 'Link o img en base 64'
  },
  categories: [
    {
      id: 'Information',
      title: 'Información',
      path: 'link o img en base 64'
    },
    {
      id: 'LayerGroup',
      title: 'Capas',
      path: 'link o img en base 64'
    },
    {
      id: 'Explorer',
      title: 'Explorar',
      path: 'link o img en base 64'
    },
    {
      id: 'Contact',
      title: 'Ayudanos a mejorar',
      path: 'link o img en base 64'
    }
  ],
  explorer: [
    {
      id: 'Height',
      title: 'Capa Altura',
      options: [
        {
          id: 'Altura',
          title: 'Altura código urbanístico',
          items: [
            {
              subTitle: '38 m',
              details: 'Corredores Altos',
              color: '#557e8d'
            },
            {
              subTitle: '31.2 m',
              details: 'Corredores Medios',
              color: '#85adb1'
            },
            {
              subTitle: '22.8 m',
              details: 'Unidades de Sustentabilidad de Altura Alta',
              color: '#ea9e82'
            },
            {
              subTitle: '16.5 m',
              details: 'Unidades de Sustentabilidad de Altura Media',
              color: '#f5c294'
            },
            {
              subTitle: '11.2 m',
              details: 'Unidades de Sustentabilidad de Altura Baja 2',
              color: '#c9c2ab'
            },
            {
              subTitle: '9 m',
              details: 'Unidades de Sustentabilidad de Altura Baja 1',
              color: '#f0e6cc'
            }
          ]
        },
        {
          id: 'Area',
          title: 'Área especial individualizada',
          items: [
            {
              subTitle: 'AE',
              details: 'Área de Arquitectura Especial',
              color: '#CCADAD'
            },
            {
              subTitle: 'APH',
              details: 'Área de Arqquitectura Especial',
              color: '#F9BCB4'
            },
            {
              subTitle: 'ARE',
              details: 'Área de Reserva Ecológica',
              color: '#BCC489'
            },
            {
              subTitle: 'Área de Renovación',
              details: 'Área de renovación urbana Riachuelo',
              color: '#efefef'
            },
            {
              subTitle: 'EE',
              details: 'Equipamentos Especiales',
              color: '#AAB4C7'
            },
            {
              subTitle: 'Espacio Público',
              details: 'Espacio Público',
              color: '#c2ccb7'
            }
          ]
        },
        {
          id: 'Mixtura',
          title: 'Mixtura de uso',
          items: [
            {
              subTitle: 'Mixtura 1',
              details: 'Área de Baja Mixtura de Usos de Suelo 1',
              color: 'white'
            },
            {
              subTitle: 'Mixtura 2',
              details: 'Área de Media Mixtura de Usos de Suelo 2',
              color: 'white'
            },
            {
              subTitle: 'Mixtura 3',
              details: 'Área de Media Mixtura de Usos de Suelo 3',
              color: 'white'
            },
            {
              subTitle: 'Mixtura 4',
              details: 'Área de Alta Mixtura de Usos de Suelo 4',
              color: 'white'
            }
          ]
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
      id: 'IncidenceAliquot',
      title: 'Capa Incidencia y Alícuota',
      options: [
        {
          id: 'Incidence',
          title: 'Incidencia Ley 6.062',
          items: [
            {
              subTitle: '',
              details: 'N/A',
              color: '#686868'
            },
            {
              subTitle: '',
              details: '< 300',
              color: '#8f9ebf'
            },
            {
              subTitle: '',
              details: '300-400',
              color: '#9ebbd7'
            },
            {
              subTitle: '',
              details: '400-500',
              color: '#9cd6c4'
            },
            {
              subTitle: '',
              details: '500-600',
              color: '#deedb8'
            },
            {
              subTitle: '',
              details: '600-700',
              color: '#ffffbe'
            },
            {
              subTitle: '',
              details: '700-800',
              color: '#ffe3a1'
            },
            {
              subTitle: '',
              details: '800-900',
              color: '#ffc473'
            },
            {
              subTitle: '',
              details: '900-1000',
              color: '#ff9e63'
            },
            {
              subTitle: '',
              details: '1000-1500',
              color: '#f2786b'
            },
            {
              subTitle: '',
              details: '>= 1500',
              color: '#c44a4a'
            }
          ]
        },
        {
          id: 'Aliquot',
          title: 'Alícuota Ley 6.062',
          items: [
            {
              subTitle: 'Zona 1',
              details: '',
              color: '#ffbfbf'
            },
            {
              subTitle: 'Zona 2',
              details: '',
              color: '#d69090'
            },
            {
              subTitle: 'Zona 3',
              details: '',
              color: '#b06868'
            },
            {
              subTitle: 'Zona 4',
              details: '',
              color: '#8a4545'
            }
          ]
        }
      ]
    }
  ],
  explorerFilters: [
    {
      id: 'Height',
      filterId: 'Height',
      title: 'Alturas Código Urbanístico'
    },
    {
      id: 'Incidence',
      filterId: 'IncidenceAliquot',
      title: 'Incidencia Ley 6.062 mod. y comp.'
    },
    {
      id: 'Aliquot',
      filterId: 'IncidenceAliquot',
      title: 'Alícuotas ley 6.062 mod. y comp.'
    }
  ],
  information: [
    {
      id: 'Buildable',
      title: 'Edificabilidad',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua'
    },
    {
      id: 'BasicData',
      title: 'Datos Básicos',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua'
    },
    {
      id: 'Uses',
      title: 'Usos',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua'
    },
    {
      id: 'Affectations',
      title: 'Afectaciones',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua'
    },
    {
      id: 'Works',
      title: 'Obras',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua'
    },
    {
      id: 'Inspections',
      title: 'Inspecciones',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua'
    }
  ],
  layersGroup: [
    {
      id: 'basePlane',
      title: 'Plano base',
      layers: [
        {
          title: 'Foto aérea 2017',
          color: ''
        },
        {
          title: 'Nombres de calles y avenidas',
          color: ''
        },
        {
          title: 'División de Lotes',
          color: ''
        }
      ]
    },
    {
      id: 'buildableStrip',
      title: 'Franja edificable',
      layers: [
        {
          title: 'Líneas de Frente Interno (L.F.I)',
          color: '#E87167'
        },
        {
          title: 'Líneas Internas de Basamento (L.I.B)',
          color: '#EDBD77'
        }
      ]
    },
    {
      id: 'listedBuildings',
      title: 'Edificios catalogados',
      layers: [
        {
          title: 'Lotes con Edificios Catalogados',
          color: '#F1D9B6'
        }
      ]
    },
    {
      id: 'lotsAffected',
      title: 'Lotes con afectaciones',
      layers: [
        {
          title: 'Riesgo Hídrico',
          color: '#8292F0'
        },
        {
          title: 'Cono Aproimación Aeroparque',
          color: '#EDBD77'
        },
        {
          title: 'Línea de Edificación Particularizada',
          color: '#8EB283'
        },
        {
          title: 'Ensanche',
          color: '#EA92F1'
        },
        {
          title: 'Apertura',
          color: '#B299BC'
        },
        {
          title: 'Cinturón Digital',
          color: '#E9E1BC'
        }
      ]
    }
  ],
  basicData: [
    {
      title: 'Sección-Manzana-Parcela',
      fill: 'smp',
      format: ''
    },
    {
      title: 'Dirección',
      fill: 'direccion',
      format: ''
    },
    {
      title: 'Superficie edificada',
      fill: 'superficie_cubierta',
      format: 'm²'
    },
    {
      title: 'Superficie de parcela',
      fill: 'superficie_total',
      format: 'm'
    },
    {
      title: 'Cantidad total de pisos',
      fill: '',
      format: ''
    },
    {
      title: 'Cantidad total de unidades funcionales',
      fill: 'unidades_funcionales',
      format: ''
    },
    {
      title: 'Cantidad de pisos sobre rasantes',
      fill: 'pisos_sobre_rasante',
      format: ''
    },
    {
      title: 'Cantidad de pisos bajo rasantes',
      fill: 'pisos_bajo_rasante',
      format: ''
    }
  ],
  capitalGain: [
    {
      title: 'Plusvalía Medianera',
      fill: 'plusvalia_em'
    },
    {
      title: 'Plusvalía Perímetro Libre',
      fill: 'plusvalia_pl'
    },
    {
      title: 'Plusvalía Perímetro Semi-Libre',
      fill: 'plusvalia_sl'
    }
  ],
  buildable: [
    {
      title: 'Superficie Máxima Edificable',
      fill: 'sup_max_edificable',
      format: ' m²'
    },
    {
      title: 'Superficie Edificable en Planta (Pisada)',
      fill: 'sup_edificable_planta',
      format: ' m²'
    },
    {
      title: 'Altura Máxima',
      fill: 'altura_max',
      format: ' m'
    },
    {
      title: 'Altura Máxima Plano Límite',
      fill: 'altura_max_plano_limite',
      format: ' m'
    },
    {
      title: 'Plusvalía',
      fill: '',
      format: ''
    },
    {
      title: 'Factor Ocupacional Total',
      subtitle: 'Medianera: ',
      fill: 'fot_medianera',
      subtitlePL: 'Perímetro Libre: ',
      fillPL: 'fot_perim_libre',
      subtitleSL: 'Perímetro Semi-Libre: ',
      fillSL: 'fot_semi_libre',
      format: ''
    },
    {
      title: 'Listado de SMP de Parcelas Linderas',
      fill: 'parcelas_linderas',
      field: 'smp_linderas',
      format: ''
    }
  ],
  uses: [
    {
      id: 1,
      title: 'Área de Baja Mixtura del Usos de Suelo 1:',
      desc: 'Corresponde a áreas predominantemente residenciales con comercios minoristas y servicios personales de baja afluencia.',
      afluencia: 'Baja',
      icons: [{ title: 'Residencia', svgId: 'iconoResidencia' }, { title: 'Comercio', svgId: 'iconoComercio' }, { title: 'Servicio', svgId: 'iconoServicio' }]
    },
    {
      id: 2,
      title: 'Área de Baja Mixtura del Usos de Suelo 2:',
      desc: 'Corresponde a las áreas y corredores destinados a residencia, servicios y comercios de mediana afluencia.',
      afluencia: 'Mediana',
      icons: [{ title: 'Residencia', svgId: 'iconoResidencia' }, { title: 'Comercio', svgId: 'iconoComercio' }, { title: 'Servicio', svgId: 'iconoServicio' }]
    },
    {
      id: 3,
      title: 'Área de Media Mixtura de Usos del Suelo 3:',
      desc: 'Corresponde a las áreas y corredores destinados a residencia, depósitos siempre que incluyan local de venta y servicios y comercios de mediana afluencia.',
      afluencia: 'Mediana',
      icons: [{ title: 'Residencia', svgId: 'iconoResidencia' }, { title: 'Comercio', svgId: 'iconoComercio' }, { title: 'Servicio', svgId: 'iconoServicio' }, { title: 'Depósitos', svgId: 'iconoDepositos' }]
    },
    {
      id: 4,
      title: 'Área de Alta Mixtura de Usos del Suelo 4:',
      desc: 'Corresponde a las áreas y corredores destinados a residencia, depósitos siempre que incluyan local de venta y servicios y comercios de afluencia metropolitana.',
      afluencia: 'Alta',
      icons: [{ title: 'Residencia', svgId: 'iconoResidencia' }, { title: 'Comercio', svgId: 'iconoComercio' }, { title: 'Servicio', svgId: 'iconoServicio' }, { title: 'Depósitos', svgId: 'iconoDepositos' }]
    }
  ],
  works: [
    {
      id: 'worksStarted',
      title: 'Obras iniciadas',
      columns: ['Expte', 'Fecha', 'Tipo de obra', 'Superficie', 'Destino']
    },
    {
      id: 'worksRegisters',
      title: 'Obras registradas',
      columns: ['Expte', 'Fecha', 'Tipo de obra', 'Superficie', '']
    },
    {
      id: 'urbanCertificates',
      title: 'Certificados urbanísticos',
      columns: ['Año', 'Repartición', 'Nº SADE', 'Dirección', '']
    }
  ],
  affectations: [
    {
      id: 'riesgo_hidrico',
      title: 'Riesgo Hídrico',
      subtitle: 'La parcela se encuentra afectada por riesgo hídrico',
      desc: 'La parcela se encuentra afectada a riesgo hídrico.'
    },
    {
      id: 'aprox_aeroparque',
      title: 'Aproximación Aeroparque',
      subtitle: 'La parcela se encuentra afectada por aproximación a Aeroparque',
      desc: 'La parcela se encuentra afectada por aproximación a Aeroparque.'
    },
    {
      id: 'lep',
      title: 'LEP',
      subtitle: 'La parcela se encuentra afectada a línea de edificación particularizada (LEP)',
      desc: 'En las nuevas construcciones que se ejecuten con posterioridad a la afectación de L.E. Particularizada con frente a las calles enumeradas en el Cuadro N° 5.4 deberá respetarse el retiro de frente al eje de calle que en el mismo se indica. La franja de terreno comprendida entre la L.O. y la L.E. resultante del retiro previsto deberá ajustarse a lo dispuesto en el artículo 4.3.1 de este Código.'
    },
    {
      id: 'ensanche',
      title: 'Ensanche',
      subtitle: 'La parcela se encuentra afectada a ensanche.',
      desc: 'La parcela se encuentra afectada a ensanche con declaración de utilidad pública y sujeción a expropiación.'
    },
    {
      id: 'apertura',
      title: 'Apertura',
      subtitle: 'La parcela se encuentra afectada a apertura de calle.',
      desc: 'La parcela se encuentra afectada a apertura de calle con declaración de utilidad pública y sujeción a expropiación.'
    },
    {
      id: 'ci_digital',
      title: 'Cinturón Digital',
      subtitle: 'La parcela se encuentra afectada a cinturón digital.',
      desc: 'La parcela se encuentra afectada a cinturón digital.'
    }
  ],
  inspections: [
    {
      id: 'worksStarted',
      title: 'Inspecciones',
      columns: ['Area', 'Dirección', 'Fecha de Inspección']
    },
    {
      id: 'worksRegisters',
      title: 'Certificados de Fachada',
      columns: ['Area', 'Dirección', 'Fecha de Inspección']
    }
  ]
}

export default config
