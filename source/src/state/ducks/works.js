import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getWorks, getSade } from 'utils/apiConfig'

const sadeProcess = [
  {
    title: 'Certificado Final de Obra ',
    columns: [
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'trata_descripcion',
        title: 'Descripción de caratulación del trámite'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo }) => trata_acronimo === 'IFFFO'
  },
  {
    title: 'Obras registradas',
    columns: [
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'fecha',
        title: 'Fecha'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo, trata_descripcion }) =>
      ['IFOCD', 'IFPCO', 'IFROC'].includes(trata_acronimo) &&
      trata_descripcion === 'P. OBRA E. PROY. / CONFORME / R. OBRAS EN CONTRA'
  },
  {
    title: 'Permisos de ejecucion de obra',
    columns: [
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'fecha',
        title: 'Fecha'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo }) => trata_acronimo === 'IFPDO'
  },
  {
    title: 'Plano de proyecto de instalacion',
    columns: [
      {
        id: 'trata_tipoinstalacion',
        title: 'Tipo de instalación'
      },
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo }) => trata_acronimo === 'PROIN'
  },
  {
    title: ' Planos conforme a obra de instalaciones (total)',
    columns: [
      {
        id: 'trata_tipoinstalacion',
        title: 'Tipo de instalación'
      },
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo, trata_tipoplano }) => trata_acronimo === 'PLINE' &&
    ['Conforme a obra de instalaciones', 'Conforme y final de obra de instalaciones'].includes(trata_tipoplano)
  },
  {
    title: 'Plano conforme a obra parcial de instalacion (parcial)',
    columns: [
      {
        id: 'trata_tipoinstalacion',
        title: 'Tipo de instalación'
      },
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo, trata_tipoplano }) => trata_acronimo === 'PLINE' &&
      ['Conforme a obra parcial de instalaciones', 'Conforme a Obra parcial'].includes(trata_tipoplano)
  },
  {
    title: 'Plano de regularizacion de instalacion',
    columns: [
      {
        id: 'trata_tipoinstalacion',
        title: 'Tipo de instalación'
      },
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo }) => trata_acronimo === 'PLINE' &&
    ['Plano de instalaciones ejecutada sin permiso', 'Regularizacion de instalaciones ejecutada sin permiso', 'Regularizacion de instalaciones en contra'].includes(trata_tipoplano)
  },
  {
    title: '',
    columns: [
      {
        id: 'expediente',
        title: 'Expediente'
      },
      {
        id: 'fecha',
        title: 'Fecha'
      },
      {
        id: 'ubicacion',
        title: 'Dirección'
      }
    ],
    filter: ({ trata_acronimo }) => trata_acronimo === ''
  }
]

const clickOnParcel = createAsyncThunk('works/clickOnParcel', async (smp) => {
  if (smp.length === undefined) {
    return { smp: 'Invalido' }
  }
  const url = getWorks(smp)
  const dataStatePromise = fetch(url).then((response) => response.json())

  const urlSade = getSade(smp)
  const dataSadePromise = fetch(urlSade).then((response) => response.json())

  const [dataState, dataSade] = await Promise.all([
    dataStatePromise,
    dataSadePromise
  ])

  const sade = sadeProcess
    .map((process) => {
      const rows = dataSade.tratas.filter(process.filter)
      const dataTable = rows.map((row) =>
        process.columns.map(({ id }) => {
          const value = row[id]
          const date = Date.parse(value)
          
          return id === 'fecha' && !isNaN(date)
            ? (new Date(value)).toLocaleDateString()
            : value
        })
      )

      return {
        title: process.title,
        columns: process.columns.map(({ title }) => title),
        dataTable
      }
    })
    .filter(({ dataTable }) => dataTable.length > 0)

  return {
    ...dataState,
    sade
  }
})

const works = createSlice({
  name: 'works',
  initialState: {
    isLoading: false,
    data: []
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = []
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = []
    }
  }
})

export default works.reducer

const actions = { ...works.actions, clickOnParcel }
export { actions }
