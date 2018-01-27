import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { apiReducer } from './Api'
import forceReducer from './force'
import swapiReducer from './swapi'

export default combineReducers({
  routing: routerReducer,
  api: apiReducer,
  force: forceReducer,
  swapi: swapiReducer
})
