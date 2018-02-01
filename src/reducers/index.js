import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { apiReducer } from './fetchApi'
import forceReducer from './force'
import sidebarReducer from './sidebar'
import swapiReducer from './swapi'

export default combineReducers({
  routing: routerReducer,
  api: apiReducer,
  force: forceReducer,
  sidebar: sidebarReducer,
  swapi: swapiReducer
})
