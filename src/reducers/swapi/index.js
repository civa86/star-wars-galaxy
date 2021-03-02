import { RSAA } from 'redux-api-middleware'
import { sortObjectCollectionByProp } from '../../utils/sorter'

// Constants
export const API_DOMAIN = 'https://swapi.dev'
export const SWAPI_REQUEST = 'SWAPI_REQUEST'
export const SWAPI_FAILURE = 'SWAPI_FAILURE'
export const SWAPI_GET_RESOURCES_SUCCESS = 'SWAPI_GET_RESOURCES_SUCCESS'
export const SWAPI_GET_ITEMS_SUCCESS = 'SWAPI_GET_ITEMS_SUCCESS'
export const SWAPI_GET_ITEM_SUCCESS = 'SWAPI_GET_ITEM_SUCCESS'
export const SWAPI_GET_SCHEMA_SUCCESS = 'SWAPI_GET_SCHEMA_SUCCESS'
export const SWAPI_NO_OP = 'SWAPI_NO_OP'

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

export const apiRequest = source => ({
  type: SWAPI_REQUEST,
  meta: { source }
})

export const addErrorMetaData = (action, state, res) => ({
  status: res.status,
  statusText: res.statusText
})

export const errorHandler = () => ({
  type: SWAPI_FAILURE,
  meta: addErrorMetaData
})

// Actions
export const getResources = () => {
  return {
    [RSAA]: {
      endpoint: API_DOMAIN + '/api/',
      method: 'GET',
      types: [apiRequest('resources'), SWAPI_GET_RESOURCES_SUCCESS, errorHandler()]
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
          apiRequest(page === 1 ? 'itemsPage' : 'itemsLoadMore'),
          {
            type: SWAPI_GET_ITEMS_SUCCESS,
            meta: { resource, page }
          },
          errorHandler()
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
  if (!currentItems.map(e => e.id).includes(itemId)) {
    return {
      [RSAA]: {
        endpoint: API_DOMAIN + '/api/' + resource + '/' + itemId + '/',
        method: 'GET',
        types: [
          apiRequest('singleItem'),
          {
            type: SWAPI_GET_ITEM_SUCCESS,
            meta: { resource }
          },
          errorHandler()
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
  const currentSchema = schemas && schemas[resource] ? schemas[resource] : null
  if (!currentSchema) {
    return {
      [RSAA]: {
        endpoint: API_DOMAIN + '/api/' + resource + '/schema',
        method: 'GET',
        types: [
          apiRequest('schema'),
          {
            type: SWAPI_GET_SCHEMA_SUCCESS,
            meta: { resource }
          },
          errorHandler()
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
  schemas: {},
  fetching: {
    schema: false,
    resources: false,
    itemsPage: false,
    itemsLoadMore: false,
    singleItem: false
  }
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SWAPI_REQUEST:
      return { ...state, fetching: { ...state.fetching, [action.meta.source]: true } }

    case SWAPI_GET_RESOURCES_SUCCESS:
      return {
        ...state,
        fetching: { ...state.fetching, resources: false },
        resources: Object.keys(action.payload).map(e => ({ name: e, url: action.payload[e] }))
      }

    case SWAPI_GET_ITEMS_SUCCESS:
      const fetchingKey = action.meta.page === 1 ? 'itemsPage' : 'itemsLoadMore'

      return {
        ...state,
        fetching: { ...state.fetching, [fetchingKey]: false },
        items: {
          ...state.items,
          [action.meta.resource]: {
            ...action.payload,
            results: addItemIfNotInStateResults(action.meta.resource, action.payload.results, state),
            lastPage: action.meta.page
          }
        }
      }

    case SWAPI_GET_ITEM_SUCCESS:
      return {
        ...state,
        fetching: { ...state.fetching, singleItem: false },
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
        fetching: { ...state.fetching, schema: false },
        schemas: {
          ...state.schemas,
          [action.meta.resource]: action.payload
        }
      }

    default:
      return state
  }
}
