import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getBuildable, getEnrase, getPlusvalia, getPdfLink
} from 'utils/apiConfig'
import { actions as alertsActions } from 'state/ducks/alerts'

const areaChanged = createAsyncThunk(
  'buildable/areaChanged',
  async ({ smp, text }) => {
    const area = Number.parseFloat(text)
    if (Number.isNaN(area) || !smp || smp.length === 0) {
      return {
        plusvalia: {
          plusvalia_em: '-',
          plusvalia_pl: '-',
          plusvalia_sl: '-'
        }
      }
    }
    const url = getPlusvalia(smp, area)
    const data = await fetch(url)
      .then((response) => response.json())
      .then(({
        plusvalia_em: em,
        plusvalia_pl: pl,
        plusvalia_sl: sl,
        alicuota: al,
        incidencia_uva: uva,
        distrito_cpu: cpu
      }) => ({
        plusvalia_em: (em === 0 ? 0 : em.toLocaleString('es-AR')),
        plusvalia_pl: (pl === 0 ? 0 : pl.toLocaleString('es-AR')),
        plusvalia_sl: (sl === 0 ? 0 : sl.toLocaleString('es-AR')),
        alicuota: (al === 0 ? 0 : al.toLocaleString('es-AR')),
        incidencia_uva: (uva === 0 ? 0 : uva.toLocaleString('es-AR')),
        distrito_cpu: cpu
      }))
    return {
      plusvalia: data
    }
  }
)

const getDataBuild = (url) => fetch(url)
  .then((response) => response.json())
  .then(({
    altura_max: alturas,
    fot: {
      fot_medianera: medianera,
      fot_perim_libre: perim,
      fot_semi_libre: semi
    },
    plusvalia: {
      // eslint-disable-next-line no-unused-vars
      plusvalia_em: em,
      // eslint-disable-next-line no-unused-vars
      plusvalia_pl: pl,
      // eslint-disable-next-line no-unused-vars
      plusvalia_sl: sl,
      alicuota: al,
      incidencia_uva: uva,
      distrito_cpu: cpu
    },
    sup_max_edificable: supMax,
    sup_edificable_planta: supPlanta,
    ...others
  }) => {
    const alturasAux = alturas
      .filter((altura) => altura > 0)
      .map((altura) => altura.toLocaleString('es-AR'))
    return ({
      altura_max: alturasAux.length === 0 ? [0] : alturasAux,
      fot: {
        fot_medianera: medianera.toLocaleString('es-AR'),
        fot_perim_libre: perim.toLocaleString('es-AR'),
        fot_semi_libre: semi.toLocaleString('es-AR'),
        total: medianera + perim + semi
      },
      plusvalia: {
        plusvalia_em: 0,
        plusvalia_pl: 0,
        plusvalia_sl: 0,
        alicuota: (al === 0 ? 0 : al.toLocaleString('es-AR')),
        incidencia_uva: (uva === 0 ? 0 : uva.toLocaleString('es-AR')),
        distrito_cpu: cpu
      },
      sup_max_edificable: supMax.toLocaleString('es-AR'),
      sup_edificable_planta: supPlanta.toLocaleString('es-AR'),
      // Por el Ticket 2863 se ignora supPlanta y se deja en cero
      // sup_edificable_planta: 0,
      ...others
    })
  })

const clickOnParcel = createAsyncThunk(
  'buildable/clickOnParcel',
  async (smp, { dispatch }) => {
    dispatch(alertsActions.clear())
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const [dataBuild, dataEnrase] = await Promise.all([
      getDataBuild(getBuildable(smp)),
      fetch(getEnrase(smp)).then((response) => response.json())
    ])

    const data = {
      ...dataBuild,
      ...dataEnrase
    }

    const esp = data
      ?.distrito_especial?.filter((distrito) => distrito.distrito_especifico.length > 0)
    // Condiciones de alertas
    const deCount = esp.length ?? 0
    const udCount = data
      ?.unidad_edificabilidad?.filter((valor) => valor > 0).length ?? 0
    if (deCount + udCount > 1) {
      dispatch(alertsActions.addId('unidad_edificabilidad'))
    } else {
      const uniEdif1 = data?.unidad_edificabilidad[0] ?? 0
      switch (uniEdif1) {
        case 38:
          dispatch(alertsActions.addId('corredor_alto'))
          break
        case 31.2:
          dispatch(alertsActions.addId('corredor_medios'))
          break
        case 22.8:
          dispatch(alertsActions.addId('usaa'))
          break
        case 17.2:
          dispatch(alertsActions.addId('usam'))
          break
        case 11.6:
          dispatch(alertsActions.addId('usab2'))
          break
        case 9:
          dispatch(alertsActions.addId('usab1'))
          break
        default:
      }
      const agrupado = esp[0]?.distrito_agrupado?.toUpperCase() ?? ''
      if (agrupado !== '') {
        const id = `especial_${agrupado.replace(/[/|\s]/, '_')}`
        dispatch(alertsActions.addId(id))
        const titleSuffix = esp[0]?.distrito_especifico?.trim()
        dispatch(alertsActions.addExtraData({ id, titleSuffix }))
      }
    }
    const afectacionesCount = Object.values(data?.afectaciones ?? {})
      .filter((valor) => valor > 0).length ?? 0
    if (afectacionesCount > 0) {
      dispatch(alertsActions.addId('afectaciones'))
    }
    if (data?.rivolta > 0 && data?.tipica?.length) {
      dispatch(alertsActions.addId('rivolta'))
    }
    if (data?.tipica?.toUpperCase() !== 'T' && !data?.manzanas_atipicas?.disposicio?.length) {
      const id = 'manzana_atipica'
      dispatch(alertsActions.addId(id))
    }
    if (data?.tipica?.toUpperCase() !== 'T' && data?.manzanas_atipicas?.disposicio?.length) {
      const id = 'manzana_atipica_disposicion'
      dispatch(alertsActions.addId(id))
      dispatch(alertsActions.addExtraData({
        id,
        value: data.manzanas_atipicas.disposicio,
        value2: data.manzanas_atipicas.pdf
          ? getPdfLink(data.manzanas_atipicas.pdf)
          : 'DISABLED'
      }))
    }
    if (data.parcelas_linderas?.aph_linderas) {
      dispatch(alertsActions.addId('adyacente_catalogado'))
    }
    if (['cautelar', 'integral', 'especial', 'estructural'].includes(data.catalogacion?.proteccion?.toLowerCase())) {
      const id = 'catalogado'
      dispatch(alertsActions.addId(id))
      const titleSuffix = data.catalogacion.proteccion
      dispatch(alertsActions.addExtraData({ id, titleSuffix }))
    }
    if ((data?.fot?.total ?? 0) === 0) {
      dispatch(alertsActions.addId('plusvalía_no_calculable'))
    }
    if (data?.enrase) {
      dispatch(alertsActions.addId('enrase'))
    }
    if (data?.subzona?.length) {
      const id = 'subzona'
      dispatch(alertsActions.addId(id))
      dispatch(alertsActions.addExtraData({ id, value: data.subzona }))
    }
    if (data?.irregular) {
      const id = 'irregular'
      dispatch(alertsActions.addId(id))
    }

    return data
  }
)

const buildable = createSlice({
  name: 'buildable',
  initialState: {
    isLoading: false,
    lastIDCAll: '',
    data: {},
    plusvalia: {},
    isSelected: false
  },
  extraReducers: {
    [areaChanged.fulfilled]: (draftState, action) => {
      draftState.plusvalia = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = {}
      draftState.isSelected = false
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
      draftState.isSelected = true
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = {}
      draftState.isSelected = false
    }
  }
})

export default buildable.reducer

const actions = { ...buildable.actions, clickOnParcel, areaChanged }
export { actions }
