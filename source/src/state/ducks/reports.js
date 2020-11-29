import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import buildPDF from 'utils/reportTemplate'

const getData = createAsyncThunk(
  'report/getData',
  async (smp, { getState }) => {
    console.log('getState().reports ', getState().reports)
    const report = getState().reports[smp]
    console.log('report ', report)

    const sections = [
      {
        title: 'Información General de la Parcela',
        dataList: [
          {
            name: 'Seccion Manzana Parcela',
            value: 'value'
          }, {
            name: 'Dirección',
            value: 'value'
          }, {
            name: 'Barrio',
            value: 'value'
          }, {
            name: 'Comuna',
            value: 'value'
          }
        ]
      }, {
        title: 'Datos de Edificabilidad',
        dataList: [
          {
            name: 'Unidad de Edificabilidad',
            value: 'value'
          }, {
            name: 'Superficie de parcela',
            value: 'value'
          }, {
            name: 'Área Edificable máxima',
            value: 'value'
          }
        ]
      }, {
        title: 'Información Urbanística',
        dataList: [
          {
            name: 'Altura Máxima Permitida',
            value: 'value'
          }, {
            name: 'Plano Límite',
            value: 'value'
          }, {
            name: 'Área Especial Agrupada',
            value: 'value'
          }, {
            name: 'Área Especial Individualizada',
            value: 'value'
          }, {
            name: 'Subzona',
            value: 'value'
          }, {
            name: 'Mixtura de uso',
            value: 'value'
          }, {
            name: 'Tipo de Afectación',
            value: 'value'
          }
        ]
      }, {
        title: 'Datos de Plusvalía',
        dataList: [
          {
            name: 'Valor de Incidencia',
            value: 'value'
          }, {
            name: 'Valor de FOT Entremedianera',
            value: 'value'
          }, {
            name: 'Valor de FOT Perímetro Libre',
            value: 'value'
          }, {
            name: 'Valor de FOT Semilibre',
            value: 'value'
          }, {
            name: 'Valor de Alícuota',
            value: 'value'
          }
        ]
      }, {
        title: '',
        dataList: [
          {
            name: '',
            value: 'value'
          }, {
            name: '',
            value: 'value'
          }
        ]
      }, {
        title: '',
        dataList: [
          {
            name: '',
            value: 'value'
          }, {
            name: '',
            value: 'value'
          }
        ]
      }, {
        title: '',
        dataList: [
          {
            name: '',
            value: 'value'
          }, {
            name: '',
            value: 'value'
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
    await buildPDF(report.sections, 'Plano Abierto - CUR3D.pdf')
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
