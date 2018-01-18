import { apiCall } from '../reducers/Api'

// Constants
const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS'
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
const GET_SCHEMA_SUCCESS = 'GET_SCHEMA_SUCCESS'

// Actions
const getResourcesSuccess = data => ({
  type: GET_RESOURCE_SUCCESS,
  data
})

const getItemsSuccess = (resource, data) => ({
  type: GET_ITEMS_SUCCESS,
  resource,
  data
})

const getSchemaSuccess = (resource, data) => ({
  type: GET_SCHEMA_SUCCESS,
  resource,
  data
})

export const getResources = () => apiCall('/api', null, getResourcesSuccess)
export const getItems = resource => apiCall('/api/' + resource, null, data => getItemsSuccess(resource, data))
export const getSchema = (resource, schemas) => {
  if (!schemas[resource]) {
    return apiCall('/api/' + resource + '/schema', null, data => getSchemaSuccess(resource, data))
  } else {
    return getSchemaSuccess(resource, schemas[resource])
  }
}

// Initial State
export const initialState = {
  resources: [],
  items: [],
  schemas: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESOURCE_SUCCESS:
      return { ...state, resources: Object.keys(action.data).map(e => ({ name: e, url: action.data[e] })) }

    case GET_ITEMS_SUCCESS:
      return { ...state, items: action.data }

    case GET_SCHEMA_SUCCESS:
      return {
        ...state,
        schemas: {
          ...state.schemas,
          [action.resource]: action.data
        }
      }

    default:
      return state
  }
}
