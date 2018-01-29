import { push } from 'react-router-redux'
import { apiCall } from '../reducers/Api'
import { sortObjectCollectionByProp } from '../utils/sorter'

// Constants
const API_DOMAIN = 'https://swapi.co'
const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS'
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS'
const GET_SCHEMA_SUCCESS = 'GET_SCHEMA_SUCCESS'

// Utilities
const getIdFromUrl = url =>
  Number(
    url
      .split('/')
      .filter(e => e !== '')
      .pop()
  )

const addItemIfNotInStateResults = (resource, newResults, state) => {
  const oldResults = state.items[resource] && state.items[resource].results ? state.items[resource].results : []
  const itemsToAdd = newResults.filter(newR => !oldResults.some(oldR => getIdFromUrl(newR.url) === oldR.id)).map(e => ({
    id: getIdFromUrl(e.url),
    ...e
  }))
  return sortObjectCollectionByProp([...oldResults, ...itemsToAdd], 'id')
}

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

const getItemSuccess = (resource, data) => ({
  type: GET_ITEM_SUCCESS,
  resource,
  data
})

const getSchemaSuccess = (resource, data) => ({
  type: GET_SCHEMA_SUCCESS,
  resource,
  data
})

const errorHandler = (error, dispatch) => {
  if (error && error.status === 404) {
    dispatch(push('/404'))
  } else {
    dispatch(push('/error'))
  }
}

export const getResources = () => apiCall(API_DOMAIN + '/api/', null, getResourcesSuccess, errorHandler)

export const getItems = (resource, items, page = 1) => {
  const lastPage = items[resource] && items[resource].lastPage ? items[resource].lastPage : 0
  if (!items[resource] || lastPage < page) {
    return apiCall(
      API_DOMAIN + '/api/' + resource + '?page=' + page,
      null,
      data => getItemsSuccess(resource, data, page),
      errorHandler
    )
  } else {
    return getItemsSuccess(resource, items[resource], page)
  }
}

export const getItem = (resource, itemId, items) => {
  const currentItems = items && items[resource] && items[resource].results ? items[resource].results : []
  if (!currentItems.map(e => getIdFromUrl(e.url)).includes(itemId)) {
    return apiCall(
      API_DOMAIN + '/api/' + resource + '/' + itemId,
      null,
      data => getItemSuccess(resource, data),
      errorHandler
    )
  } else {
    return getItemSuccess(resource, currentItems.filter(e => getIdFromUrl(e.url) === itemId).pop())
  }
}

export const getSchema = (resource, schemas) => {
  if (!schemas[resource]) {
    return apiCall(
      API_DOMAIN + '/api/' + resource + '/schema',
      null,
      data => getSchemaSuccess(resource, data),
      errorHandler
    )
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
            results: addItemIfNotInStateResults(action.resource, action.data.results, state),
            lastPage: action.page
          }
        }
      }
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.resource]: {
            ...state.items[action.resource],
            results: addItemIfNotInStateResults(action.resource, [action.data], state)
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
