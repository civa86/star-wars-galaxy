import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import force from './force'
import sidebar from './sidebar'
import swapi from './swapi'

export default combineReducers({
  routing: routerReducer,
  force,
  sidebar,
  swapi
})
