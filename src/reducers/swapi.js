import { push } from 'react-router-redux'
import { RSAA } from 'redux-api-middleware'
import { sortObjectCollectionByProp } from '../utils/sorter'

// Constants
const API_DOMAIN = 'https://swapi.co'
const SWAPI_REQUEST = 'SWAPI_REQUEST'
const SWAPI_GET_RESOURCES_SUCCESS = 'SWAPI_GET_RESOURCES_SUCCESS'
const SWAPI_GET_ITEMS_SUCCESS = 'SWAPI_GET_ITEMS_SUCCESS'
const SWAPI_GET_ITEM_SUCCESS = 'SWAPI_GET_ITEM_SUCCESS'
const SWAPI_GET_SCHEMA_SUCCESS = 'SWAPI_GET_SCHEMA_SUCCESS'
const SWAPI_FAILURE = 'SWAPI_FAILURE'
const SWAPI_NO_OP = 'SWAPI_NO_OP'

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
    resource,
    ...e
  }))
  return sortObjectCollectionByProp([...oldResults, ...itemsToAdd], 'id')
}

// Actions
export const getResources = () => {
  return {
    [RSAA]: {
      endpoint: API_DOMAIN + '/api/',
      method: 'GET',
      types: [
        {
          type: SWAPI_REQUEST,
          meta: { source: 'resources' }
        },
        SWAPI_GET_RESOURCES_SUCCESS,
        push('/error') //TODO: push a failure action with meta props and create a ERROR middleware
      ]
    }
  }
}

export const getItems = (resource, items, page = 1) => {
  const lastPage = items[resource] && items[resource].lastPage ? items[resource].lastPage : 0
  if (!items[resource] || lastPage < page) {
    return {
      [RSAA]: {
        endpoint: API_DOMAIN + '/api/' + resource + '/?page=' + page,
        method: 'GET',
        types: [
          {
            type: SWAPI_REQUEST,
            meta: { source: 'items' }
          },
          {
            type: SWAPI_GET_ITEMS_SUCCESS,
            meta: { resource, page }
          },
          push('/error') //TODO: push a failure action with meta props and create a ERROR middleware
        ]
      }
    }
  } else {
    return {
      type: SWAPI_NO_OP
    }
  }
}

export const getItem = (resource, itemId, items) => {
  const currentItems = items && items[resource] && items[resource].results ? items[resource].results : []
  if (!currentItems.map(e => getIdFromUrl(e.url)).includes(itemId)) {
    return {
      [RSAA]: {
        endpoint: API_DOMAIN + '/api/' + resource + '/' + itemId + '/',
        method: 'GET',
        types: [
          {
            type: SWAPI_REQUEST,
            meta: { source: resource + '-' + itemId }
          },
          {
            type: SWAPI_GET_ITEM_SUCCESS,
            meta: { resource }
          },
          push('/error') //TODO: push a failure action with meta props and create a ERROR middleware
        ]
      }
    }
  } else {
    return {
      type: SWAPI_NO_OP
    }
  }
}

export const getSchema = (resource, schemas) => {
  if (!schemas[resource]) {
    return {
      [RSAA]: {
        endpoint: API_DOMAIN + '/api/' + resource + '/schema',
        method: 'GET',
        types: [
          {
            type: SWAPI_REQUEST,
            meta: { source: 'schema' }
          },
          {
            type: SWAPI_GET_SCHEMA_SUCCESS,
            meta: { resource }
          },
          push('/error') //TODO: push a failure action with meta props and create a ERROR middleware
        ]
      }
    }
  } else {
    return {
      type: SWAPI_NO_OP
    }
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
    case SWAPI_GET_RESOURCES_SUCCESS:
      const data = action.payload || {}
      return { ...state, resources: Object.keys(data).map(e => ({ name: e, url: data[e] })) }

    case SWAPI_GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.meta.resource]: {
            ...action.payload,
            results: addItemIfNotInStateResults(action.meta.resource, action.payload.results, state),
            lastPage: action.page
          }
        }
      }

    case SWAPI_GET_ITEM_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.meta.resource]: {
            ...state.items[action.meta.resource],
            results: addItemIfNotInStateResults(action.meta.resource, [action.payload], state)
          }
        }
      }

    case SWAPI_GET_SCHEMA_SUCCESS:
      return {
        ...state,
        schemas: {
          ...state.schemas,
          [action.meta.resource]: action.payload
        }
      }

    default:
      return state
  }
}
