import initialState from './initialState'

// Constants
const IS_FETCHING = 'IS_FETCHING'
const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS'

// Actions
//TODO: write a API middleware...

export const getResources = () => {
  return async dispatch => {
    dispatch({
      type: IS_FETCHING
    })
    try {
      const resources = await fetch('/api/')
      const data = await resources.json()
      dispatch({
        type: GET_RESOURCE_SUCCESS,
        data
      })
    } catch (e) {
      throw new Error(e)
      //TODO: dispatch page...
    }
  }
}

// Reducer
export default (state = initialState.swapi, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true
      }

    case GET_RESOURCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        resources: Object.keys(action.data).map(e => ({
          name: e,
          url: action.data[e]
        }))
      }

    default:
      return state
  }
}
