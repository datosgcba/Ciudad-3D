/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import buildPDF from 'utils/reportTemplate'

import {
  getParcelBySmp, getBuildable, getUses, getAffectations
} from 'utils/apiConfig'

import { getAffectationsTable } from 'utils/configQueries'

const getData = createAsyncThunk(
  'report/getData',
  async (smp) => {
    const { direccion, superficie_total } = await fetch(getParcelBySmp(smp))
      .then((response) => response.json())
    const {
      unidad_edificabilidad,
      sup_edificable_planta,
      altura_max,
      altura_max_plano_limite,
      distrito_especial,
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
      subzona
    } = await fetch(getBuildable(smp))
      .then((response) => response.json())

    const { usos } = await fetch(getUses(smp))
      .then((response) => response.json())
    const afectaciones = await fetch(getAffectations(smp))
      .then((response) => response.json())
    const afectacionesFiltrado = Object.entries(afectaciones).filter(([, value]) => value
    !== 0).map(([key]) => key)

    const affectationsTable = await getAffectationsTable()
    const afectacionesText = afectacionesFiltrado
      .map((id) => affectationsTable.find((at) => at.id === id))
      .filter((d) => d !== undefined)
      .map(({ title }) => title)
      .join(', ')

    const sections = [
      {
        title: 'Información General de la Parcela',
        dataList: [
          {
            name: 'Seccion Manzana Parcela',
            value: smp
          }, {
            name: 'Dirección',
            value: direccion
          }, {
            name: 'Superficie de Parcela',
            value: `${Number.parseFloat(superficie_total).toLocaleString('es-AR')} m²`
          }
        ]
      }, {
        title: 'Datos de Edificabilidad',
        dataList: [
          {
            name: 'Unidad de Edificabilidad',
            value: unidad_edificabilidad
              .filter((value) => value > 0)
              .map((value) => value.toLocaleString('es-AR'))
              .join(', ')
          }, {
            name: 'Superficie Edificable en Planta (Pisada)',
            value: sup_edificable_planta.toLocaleString('es-AR')
          }
        ]
      }, {
        title: 'Información Urbanística',
        dataList: [
          {
            name: 'Altura Máxima Permitida',
            value: altura_max
              .filter((value) => value > 0)
              .map((value) => value.toLocaleString('es-AR'))
              .join(', ')
          }, {
            name: 'Plano Límite',
            value: altura_max_plano_limite.toLocaleString('es-AR')
          }, {
            name: 'Área Especial Agrupada',
            value: distrito_especial
              .map(({ distrito_agrupado }) => distrito_agrupado)
              .filter((value) => (value.length ?? '') > 0)
              .join(', ')
          }, {
            name: 'Área Especial Individualizada',
            value: distrito_especial
              .map(({ distrito_especifico }) => distrito_especifico)
              .filter((value) => (value.length ?? '') > 0)
              .join(', ')
          }, {
            name: 'Mixtura de uso',
            value: usos
              .filter((value) => value > 0)
              .join(', ')
          }, {
            name: 'Tipo de Afectación',
            value: afectacionesText
          },
          {
            name: 'Subzona',
            value: subzona
          }
        ]
      }, {
        title: 'Datos de Plusvalía',
        dataList: [
          {
            name: 'Valor de FOT Entremedianera',
            value: medianera.toLocaleString('es-AR')
          }, {
            name: 'Valor de FOT Perímetro Libre',
            value: perim.toLocaleString('es-AR')
          }, {
            name: 'Valor de FOT Semilibre',
            value: semi.toLocaleString('es-AR')
          },
          {
            name: 'Incidencia',
            value: incidencia_uva.toLocaleString('es-AR')
          },
          {
            name: 'Alicuota',
            value: alicuota.toLocaleString('es-AR')
          },
          {
            name: 'Distrito CPU',
            value: distrito_cpu
          }
        ]
      }, {
        title: 'Datos de la manzana',
        dataList: [
          {
            name: 'Tipo de manzana',
            value: tipica === 'T' ? 'Típica' : 'Atípica'
          }
        ]
      }, {
        title: 'Información sobre linderos',
        dataList: [
          {
            name: 'Parcelas linderas',
            value: aph_linderas
              ? smp_linderas.join(' | ')
              : ''
          }
        ]
      }, {
        title: 'Patrimonio Arquitectonico y Urbanistico',
        dataList: [
          {
            name: 'Denominación',
            value: denominacion
          },
          {
            name: 'Catalogación',
            value: proteccion
          },
          {
            name: 'Protección',
            value: catalogacion
          },
          {
            name: 'Estado',
            value: estado
          },
          {
            name: 'LEY 3056 - Edificio Anterior a 1941',
            value: ley_3056
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
    [getData.rejected]: (draftState, { meta: { arg: smp } }) => {
      draftState[smp].state = 'error'
    }
  }
})

export default reports.reducer

const actions = { ...reports.actions, getData, download }
export { actions }
