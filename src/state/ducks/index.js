import { combineReducers } from 'redux'

import affectations from './affectations'
import basicData from './basicData'
import buildable from './buildable'
import categories from './categories'
import explorer from './explorer'
import map from './map'
import parcel from './parcel'
import seeker from './seeker'
import uses from './uses'

export default combineReducers({
  categories, map, seeker, basicData, buildable, uses, parcel, affectations, explorer
})
