import { apiCall } from '../reducers/Api'

// Constants
const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS'

// Actions
const getResourcesSuccess = data => ({
  type: GET_RESOURCE_SUCCESS,
  data
})

export const getResources = () => apiCall('/api', null, getResourcesSuccess)

// Initial State
export const initialState = {
  resources: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESOURCE_SUCCESS:
      return {
        ...state,
        resources: Object.keys(action.data).map(e => ({
          name: e,
          url: action.data[e]
        }))
      }

    default:
      return state
  }
}
