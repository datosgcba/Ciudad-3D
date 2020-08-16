import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './ducks'

export default configureStore({
  reducer: rootReducer
})
