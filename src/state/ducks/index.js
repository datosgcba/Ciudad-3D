import { combineReducers } from 'redux'

import categories from './categories'
import map from './map'
import seeker from './seeker'

export default combineReducers({
  categories, map, seeker
})
