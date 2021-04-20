import { combineReducers } from 'redux'

import affectations from './affectations'
import alerts from './alerts'
import basicData from './basicData'
import buildable from './buildable'
import categories from './categories'
import contact from './contact'
import explorer from './explorer'
import inspections from './inspections'
import map from './map'
import parcel from './parcel'
import reports from './reports'
import seeker from './seeker'
import tour from './tour'
import uses from './uses'
import works from './works'

export default combineReducers({
  alerts,
  categories,
  contact,
  map,
  seeker,
  basicData,
  buildable,
  uses,
  parcel,
  affectations,
  explorer,
  works,
  inspections,
  tour,
  reports
})
