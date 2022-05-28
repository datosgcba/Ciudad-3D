/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import buildPDF from 'utils/reportTemplate'

import {
  getParcelBySmp, getBuildable, getPdfLink, getAffectations, getUses
} from 'utils/apiConfig'
/* import {
  getParcelBySmp, getBuildable, getUses, getAffectations
} from 'utils/apiConfig' */

import { getAlert, getAffectationsTable, getUsesTable } from 'utils/configQueries'
// import { getAffectationsTable, getAlert } from 'utils/configQueries'

const getData = createAsyncThunk(
  'report/getData',
  async (smp) => {
    const { direccion, superficie_total } = await fetch(getParcelBySmp(smp))
      .then((response) => response.json())

    const buildableData = await fetch(getBuildable(smp))
      .then((response) => response.json())

    const {
      unidad_edificabilidad,
      sup_edificable_planta,
      altura_max,
      distrito_especial,
      // altura_max_plano_limite,
      fot: {
        fot_medianera: medianera,
        fot_perim_libre: perim,
        fot_semi_libre: semi
      },
      tipica,
      parcelas_linderas: {
        aph_linderas,
        smp_linderas
      },
      catalogacion: {
        proteccion,
        denominacion,
        estado,
        ley_3056,
        catalogacion
      },
      plusvalia: { incidencia_uva, alicuota, distrito_cpu },
      link_imagen: {
        croquis_parcela,
        perimetro_manzana,
        plano_indice
      },
      subzona,
      manzanas_atipicas: {
        disposicio,
        pdf
      }
    } = buildableData

    const afectaciones = await fetch(getAffectations(smp))
      .then((response) => response.json())
    const afectacionesFiltrado = Object.entries(afectaciones).filter(([, value]) => value
    !== 0).map(([key]) => key)

    const affectationsTable = await getAffectationsTable()
    const afectacionesText = afectacionesFiltrado
      .map((id) => affectationsTable.find((at) => at.id === id))
      .filter((d) => d !== undefined)
      .filter(({ titleReport }) => titleReport !== null)
      .map(({ titleReport, textReport }) => `${titleReport}: ${textReport}`)

    const { usos } = await fetch(getUses(smp))
      .then((response) => response.json())
    const usesTable = await getUsesTable()
    const dataUsos = usos
      .map((id) => usesTable.find((ut) => ut.id === id))
      .filter((d) => d !== undefined)
      ?.usos
      ?.filter((value) => value > 0)
      ?.map(({ title, desc }) => ({
        titleReport: title, textReport: desc
      }))

    const noUsos = getAlert('no_usos')
    const usosValue = dataUsos?.length > 0
      ? dataUsos
      : [{ titleReport: noUsos.title, textReport: noUsos.text }]

    const adyacenteCatalogado = getAlert('adyacente_catalogado')

    let usoCatalogado
    switch (proteccion?.toLowerCase()) {
      case 'cautelar':
        usoCatalogado = 'Cautelar'
        break
      case 'integral':
        usoCatalogado = 'Integral'
        break
      case 'estructural':
        usoCatalogado = 'Estructural'
        break
      default:
        usoCatalogado = null
    }

    const alertSmp = () => {
      let result
      switch (unidad_edificabilidad[0]) {
        case 38:
          result = getAlert('corredor_alto')
          break
        case 31.2:
          result = getAlert('corredor_medios')
          break
        case 22.8:
          result = getAlert('usaa')
          break
        case 17.2:
          result = getAlert('usam')
          break
        case 11.6:
          result = getAlert('usab2')
          break
        case 9:
          result = getAlert('usab1')
          break
        default:
          result = { titleReport: null }
      }
      return result.titleReport
    }
    const unidadEdificabilidad = alertSmp()

    let perfilEdificableImage = null
    let areaEdificable = null
    switch (unidad_edificabilidad?.length && unidad_edificabilidad[0]) {
      case 9:
      case 11.6:
        perfilEdificableImage = 'retiros1'
        areaEdificable = 'L.O - L.I.B'
        break
      case 17.2:
      case 22.8:
        perfilEdificableImage = 'retiros2'
        areaEdificable = 'L.O - L.F.I.'
        break
      case 31.2:
      case 38:
        perfilEdificableImage = 'retiros2'
        areaEdificable = 'L.O - L.I.B Basamento, L.O - L.F.I Cuerpo Principal'
        break
      default:
        perfilEdificableImage = null
        areaEdificable = null
    }

    let distritoEspecial = distrito_especial
      ?.map(({ distrito_especifico }) => distrito_especifico)
      .filter((value) => (value?.length ?? '') > 0)
      .join(', ')
    distritoEspecial = distritoEspecial?.length
      ? distritoEspecial
      : null

    let distritoAPH = distrito_especial
      ?.map(({ distrito_especifico, distrito_agrupado }) => distrito_especifico)
      .filter(({ distrito_agrupado, distrito_especifico }) => distrito_agrupado === 'APH')
      .map(({ distrito_especifico }) => distrito_especifico)
      .join(', ')
    distritoAPH = distritoAPH?.length
      ? distritoAPH
      : null

    const sections = [
      {
        title: 'Información General',
        dataList: [
          {
            name: 'Dirección',
            value: direccion ?? ''
          }, {
            name: 'Nomenclatura Catastral(Seccion Manzana Parcela)',
            value: smp ?? ''
          }, {
            name: 'Plano Índice',
            value: plano_indice,
            linkText: 'Descargar'
          }, {
            name: 'Croquis de Parcela',
            value: croquis_parcela,
            linkText: 'Descargar'
          }, {
            name: 'Perímetro de Manzana',
            value: perimetro_manzana,
            linkText: 'Descargar'
          }, {
            name: 'Superficie de Parcela',
            value: superficie_total ? `${Number.parseFloat(superficie_total).toLocaleString('es-AR')} m²` : ''
          }, {
            name: 'Tipo de manzana',
            value: tipica === 'T' ? 'Típica' : 'Atípica'
          }
        ]
      }, {
        title: 'Edificabilidad',
        dataList: [
          {
            name: 'Unidad de Edificabilidad / Corredor',
            value: unidadEdificabilidad
          }, {
            name: 'Altura Máxima',
            value: altura_max
              ? `${altura_max
                .filter((value) => value > 0)
                .map((value) => value?.toLocaleString('es-AR'))
                .join(', ')}mts (Ley 6361 Art. 6.2)`
              : null
          }, {
            name: 'Área Especial Individualizada',
            value: distritoEspecial
          }, {
            name: 'Subzona',
            value: subzona
              ? `${subzona} (Ley 6361 Anexo II)`
              : null
          }, {
            name: 'Perfil Edificable',
            value: 'Ley 6361 Art. 6.3, 6.3.1 y 6.3.1.1',
            image: perfilEdificableImage
          }, {
            name: 'Área Edificable',
            value: areaEdificable
          }, {
            name: 'Disposición de Trazado de LFI/LIB particularizadas',
            value: disposicio?.length
              ? getPdfLink(pdf)
              : 'No aplica'
          }, {
            name: 'Afectaciones',
            value: afectacionesText?.length
              ? afectacionesText
              : null
          }
        ]
      }, {
        title: 'Usos del Suelo',
        dataList: [
          {
            name: '',
            value: usosValue
          }, {
            name: '',
            value: usosValue.length > 1
              ? 'La parcela se encuentra afectada a dos o más áreas de mixtura de usos, por lo cual se podrán localizar los usos que se encuentren permitidos en cualquiera de éstas mixturas, debiendo ejecutarse accesos sobre cada L.O. concordante con la mixtura de uso correspondiente.'
              : null
          }, {
            name: '',
            value: usoCatalogado
              ? [
                'Se deberá consultar al Organismo Competente a través de una ',
                {
                  titleReport: 'https://www.buenosaires.gob.ar/tramites/consulta-de-usos',
                  textReport: 'Consulta de Usos',
                  isLink: true
                },
                ` ya que el inmueble sito en la parcela se encuentra se encuentra catalogada con nivel de protección ${usoCatalogado}`
              ]
              : null
          }, {
            name: '',
            value: usos.some((id) => id === 1)
              ? [
                'Para la localización de actividades productivas e industriales se deberá consultar al Organismo Competente a través de una ',
                {
                  titleReport: 'https://www.buenosaires.gob.ar/tramites/consulta-de-usos',
                  textReport: 'Consulta de Usos',
                  isLink: true
                }
              ]
              : null
          }
        ]
      }, {
      //   title: 'Información Urbanística',
      //   dataList: [
      //     {
      //       name: 'Altura Máxima Permitida',
      //       value: altura_max
      //         ?.filter((value) => value > 0)
      //         .map((value) => value?.toLocaleString('es-AR'))
      //         .join(', ') ?? ''
      //     }, {
      //       name: 'Plano Límite',
      //       value: altura_max_plano_limite?.toLocaleString('es-AR') ?? ''
      //     }, {
      //       name: 'Área Especial Agrupada',
      //       value: distrito_especial
      //         ?.map(({ distrito_agrupado }) => distrito_agrupado)
      //         .filter((value) => (value?.length ?? '') > 0)
      //         .join(', ') ?? ''
      //     }, {
      //       name: 'Mixtura de uso',
      //       value: usos
      //         ?.filter((value) => value > 0)
      //         .join(', ') ?? ''
      //     }, {
      //       name: 'Tipo de Afectación',
      //       value: afectacionesText ?? ''
      //     }, {
      //       name: 'Subzona',
      //       value: subzona ?? ''
      //     }
      //   ]
      // }, {
        title: 'Desarrollo Urbano y Hábitat Sustentable | Plusvalía',
        dataList: [
          {
            name: 'Zonificación según CPU',
            value: distrito_cpu ?? ''
          }, {
            name: 'Superficie de Parcela',
            value: superficie_total ? `${Number.parseFloat(superficie_total).toLocaleString('es-AR')} m²` : ''
          }, {
            name: 'FOT',
            value: medianera?.toLocaleString('es-AR') ?? ''
          }, {
          //   name: 'Valor de FOT Perímetro Libre',
          //   value: perim?.toLocaleString('es-AR') ?? ''
          // }, {
          //   name: 'Valor de FOT Semilibre',
          //   value: semi?.toLocaleString('es-AR') ?? ''
          // },  {
            name: 'Incidencia Uva',
            value: incidencia_uva?.toLocaleString('es-AR') ?? ''
          }, {
            name: 'Alicuota',
            value: alicuota?.toLocaleString('es-AR') ?? ''
          }
        ]
      }, {
      //   title: 'Información sobre linderos',
      //   dataList: [
      //     {
      //       name: 'Parcelas linderas',
      //       value: aph_linderas && smp_linderas
      //         ? smp_linderas.join(' | ')
      //         : ''
      //     }
      //   ]
      // }, {
        title: 'Patrimonio Arquitectónico y Urbano',
        dataList: [
          {
            name: 'Área de Protección histórica',
            value: distritoAPH
          },
          {
            name: 'Denominación',
            value: denominacion?.length
              ? denominacion
              : null
          }, {
            name: 'Catalogación',
            value: catalogacion?.length
              ? catalogacion
              : null
          }, {
            name: 'Protección',
            value: proteccion?.length
              ? proteccion
              : null
          }, {
            name: '',
            value: usoCatalogado
              ? `La parcela se encuentra catalogada con nivel de protección ${usoCatalogado} por lo cual son de aplicación los grados de intervención 1/2/3/4 (Cuadro de Grados de Intervención según Nivel de Protección Edilicia art. 9.1.3.2.2.2.)`
              : null
          }, {
            name: adyacenteCatalogado.title,
            value: aph_linderas
              ? adyacenteCatalogado.text
              : null
          }
        ]
      }
    ]
    return { smp, direccion, sections }
  },
  {
    condition: (smp, { getState }) => !getState().reports[smp]
  }
)

const download = createAsyncThunk(
  'report/download',
  async (smp, { getState }) => {
    const report = getState().reports[smp]
    await buildPDF(report.sections, `Plano Abierto - CUR3D ${smp}.pdf`)
  }
)

const reports = createSlice({
  name: 'reports',
  initialState: {
  },
  extraReducers: {
    [getData.pending]: (draftState, { meta: { arg: smp } }) => {
      draftState[smp] = { state: 'loading' }
    },
    [getData.fulfilled]: (draftState, { payload: { smp, direccion, sections } }) => {
      draftState[smp].sections = sections
      draftState[smp].state = 'ready'
      draftState[smp].address = direccion
    },
    [getData.rejected]: (draftState, { error, meta: { arg: smp } }) => {
      console.error('getData.rejected:', error)
      draftState[smp].state = 'error'
    },
    [download.rejected]: (draftState, { error, meta: { arg: smp } }) => {
      console.error('download.rejected:', error)
      draftState[smp].state = 'error'
    }
  }
})

export default reports.reducer

const actions = { ...reports.actions, getData, download }
export { actions }
