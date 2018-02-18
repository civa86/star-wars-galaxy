import { push } from 'react-router-redux'
import { SWAPI_FAILURE } from '../../reducers/swapi'

const error = store => next => action => {
  let result = next(action)

  if (action && action.type) {
    switch (action.type) {
      case SWAPI_FAILURE:
        if (action.meta && action.meta.status === 404) {
          return store.dispatch(push('/404'))
        } else {
          return store.dispatch(push('/error'))
        }

      default:
        return result
    }
  }

  return result
}

export default error
