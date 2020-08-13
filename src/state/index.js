import { configureStore, getDefaultMiddleware, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit'
import rootReducer from './ducks'

// TODO: todos las acciones y estados deben ser serializables
const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['map/updateMap'],
    ignoredPaths: ['map.mapaGL']
  }
})

// TODO: !!! [0] es immutableStateInvariantMiddleware: Se detiene el app por referencia circular
middleware[0] = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['map.mapaGL']
})

export default configureStore({
  reducer: rootReducer,
  middleware
})
