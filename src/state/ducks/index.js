import { combineReducers } from 'redux'

import basicData from './basicData'
import categories from './categories'
import map from './map'
import parcel from './parcel'
import seeker from './seeker'

export default combineReducers({
  categories, map, seeker, basicData, parcel
})
