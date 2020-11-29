import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import buildPDF from 'utils/reportTemplate'

import { getParcelBySmp } from 'utils/apiConfig'
import { getBuildable, getPlusvalia } from 'utils/apiConfig'

const getData = createAsyncThunk(
  'report/getData',
  async (smp, { getState }) => {
    console.log('getState().reports ', getState().reports)
    const report = getState().reports[smp]
    console.log('report ', report)

    const { direccion  } = await fetch(getParcelBySmp(smp))
      .then((response) => response.json())
    const { unidad_edificabilidad  } = await fetch(getBuildable(smp))
      .then((response) => response.json())
      
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
            name: 'Barrio',
            value: '...........................'
          }, {
            name: 'Comuna',
            value: '...........................'
          }
        ]
      }, {
        title: 'Datos de Edificabilidad',
        dataList: [
          {
            name: 'Unidad de Edificabilidad',
            value: JSON.stringify(unidad_edificabilidad[0] ?? '')
          }, {
            name: 'Superficie de parcela',
            value: '...........................'
          }, {
            name: 'Área Edificable máxima',
            value: '...........................'
          }
        ]
      }, {
        title: 'Información Urbanística',
        dataList: [
          {
            name: 'Altura Máxima Permitida',
            value: '...........................'
          }, {
            name: 'Plano Límite',
            value: '...........................'
          }, {
            name: 'Área Especial Agrupada',
            value: '...........................'
          }, {
            name: 'Área Especial Individualizada',
            value: '...........................'
          }, {
            name: 'Subzona',
            value: '...........................'
          }, {
            name: 'Mixtura de uso',
            value: '...........................'
          }, {
            name: 'Tipo de Afectación',
            value: '...........................'
          }
        ]
      }, {
        title: 'Datos de Plusvalía',
        dataList: [
          {
            name: 'Valor de Incidencia',
            value: '...........................'
          }, {
            name: 'Valor de FOT Entremedianera',
            value: '...........................'
          }, {
            name: 'Valor de FOT Perímetro Libre',
            value: '...........................'
          }, {
            name: 'Valor de FOT Semilibre',
            value: '...........................'
          }, {
            name: 'Valor de Alícuota',
            value: '...........................'
          }
        ]
      }, {
        title: 'Datos de la manzana',
        dataList: [
          {
            name: 'Tipo de manzana',
            value: '...........................'
          }
        ]
      }, {
        title: 'Información sobre linderos',
        dataList: [
          {
            name: 'Parcelas linderas / Grado de Consolidación',
            value: '...........................'
          }, {
            name: 'APH Linderos',
            value: '...........................'
          }
        ]
      }
    ]
    console.log({ [smp]: report })
    return { smp, sections }
  },
  {
    condition: (smp, { getState }) => {
      return getState().reports[smp]?.state !== 'loading'
    }
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
