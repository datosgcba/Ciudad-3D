import { combineReducers } from 'redux'

import basicData from './basicData'
import categories from './categories'
import map from './map'
import seeker from './seeker'

export default combineReducers({
  categories, map, seeker, basicData
})
