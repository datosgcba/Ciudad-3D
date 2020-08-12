import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './ducks'

// TODO: immutableStateInvariantMiddleware arroja error por referencia circular en el estado
export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().slice(1, 40)
})
