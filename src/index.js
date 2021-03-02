import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

import App from './containers/App'
import ServiceWorker from './components/ServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
        <ServiceWorker />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
