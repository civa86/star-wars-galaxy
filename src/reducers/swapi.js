import { push } from 'react-router-redux'
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

const getItemsSuccess = (resource, data, page) => ({
  type: GET_ITEMS_SUCCESS,
  resource,
  data,
  page
})

const getSchemaSuccess = (resource, data) => ({
  type: GET_SCHEMA_SUCCESS,
  resource,
  data
})

const errorHandler = (error, dispatch) => {
  if (error.status === 404) {
    dispatch(push('/404'))
  } else {
    dispatch(push('/error'))
  }
}

export const getResources = () => apiCall('/api', null, getResourcesSuccess, errorHandler)
export const getItems = (resource, items, page = 1) => {
  const lastPage = items[resource] && items[resource].lastPage ? items[resource].lastPage : 0
  if (!items[resource] || lastPage < page) {
    return apiCall(
      '/api/' + resource + '?page=' + page,
      null,
      data => getItemsSuccess(resource, data, page),
      errorHandler
    )
  } else {
    return getItemsSuccess(resource, items[resource], page)
  }
}
export const getSchema = (resource, schemas) => {
  if (!schemas[resource]) {
    return apiCall('/api/' + resource + '/schema', null, data => getSchemaSuccess(resource, data), errorHandler)
  } else {
    return getSchemaSuccess(resource, schemas[resource])
  }
}

// Initial State
export const initialState = {
  resources: [],
  items: {},
  schemas: {}
}

// Reducer
const getIdFromUrl = url =>
  url
    .split('/')
    .filter(e => e !== '')
    .pop()

const getUpdatedResults = (resource, newResults, state) => {
  const oldResults = state.items[resource] && state.items[resource].results ? state.items[resource].results : []
  const itemsToAdd = newResults.filter(
    newR => !oldResults.some(oldR => getIdFromUrl(newR.url) === getIdFromUrl(oldR.url))
  )
  return [...oldResults, ...itemsToAdd]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESOURCE_SUCCESS:
      return { ...state, resources: Object.keys(action.data).map(e => ({ name: e, url: action.data[e] })) }

    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.resource]: {
            ...action.data,
            results: getUpdatedResults(action.resource, action.data.results, state),
            lastPage: action.page
          }
        }
      }

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
