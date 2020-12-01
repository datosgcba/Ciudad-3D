import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import buildPDF from 'utils/reportTemplate'

import {
  getParcelBySmp, getBuildable, getUses, getAffectations, getPlusvalia
} from 'utils/apiConfig'

import { getUsesTable, getAffectationsTable } from 'utils/configQueries'

const getData = createAsyncThunk(
  'report/getData',
  async (smp, { getState }) => {
    console.log('getState().reports ', getState().reports)
    const report = getState().reports[smp]
    console.log('report ', report)

    const { direccion } = await fetch(getParcelBySmp(smp))
      .then((response) => response.json())
    const {
      unidad_edificabilidad,
      sup_edificable_planta,
      sup_max_edificable,
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
      }
    } = await fetch(getBuildable(smp))
      .then((response) => response.json())

    const usesTable = await getUsesTable()
    const { usos } = await fetch(getUses(smp))
      .then((response) => response.json())
    /*
    const usosText = usos
      .map((id) => usesTable.find((ut) => ut.id === id))
      .filter((u) => u !== undefined)
      .map(({ title }) => title)
      .join(', ')
    console.log('usos:', usos, usosText)
*/
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
          }, {
            name: 'Superficie Máxima Edificable',
            value: sup_max_edificable.toLocaleString('es-AR')
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
          }
        ]
      }, {
        title: 'Datos de la manzana',
        dataList: [
          {
            name: 'Tipo de manzana',
            value: tipica?.length > 0 ? 'Atípica' : ''
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
      }
    ]
    console.log({ [smp]: report })
    return { smp, sections }
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
    [getData.fulfilled]: (draftState, { payload: { smp, sections } }) => {
      draftState[smp].sections = sections
      draftState[smp].state = 'ready'
    },
    [getData.rejected]: (draftState, { meta: { arg: smp } }) => {
      draftState[smp].state = 'error'
    }
  }
})

export default reports.reducer

const actions = { ...reports.actions, getData, download }
export { actions }
