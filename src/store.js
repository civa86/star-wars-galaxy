import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import createHistory from 'history/createBrowserHistory'

import ErrorMiddleware from './middleware/error'
import rootReducer from './reducers'

export const history = createHistory()

const enhancers = []
const middleware = [thunk, apiMiddleware, routerMiddleware(history), ErrorMiddleware]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer, {}, composedEnhancers)

export default store
