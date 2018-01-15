import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import swapi from './swapi.js'

export default combineReducers({
  routing: routerReducer,
  swapi
})
