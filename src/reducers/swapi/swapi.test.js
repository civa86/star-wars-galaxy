import { RSAA } from 'redux-api-middleware'
import swapi, {
//CONSTANTS
  SWAPI_REQUEST,
  SWAPI_FAILURE,
  SWAPI_GET_RESOURCES_SUCCESS,
  SWAPI_GET_ITEMS_SUCCESS,
  SWAPI_GET_ITEM_SUCCESS,
  SWAPI_GET_SCHEMA_SUCCESS,
  SWAPI_NO_OP,
  //INIT STATE
  initialState,
  //ACTION HELPERS
  apiRequest,
  addErrorMetaData,
  errorHandler,
  //ACTIONS
  getResources,
  getItems,
  getItem,
  getSchema
} from './index'

describe('swapi actions', () => {
  describe('action helpers', () => {
    it('provides a apiRequest helper', () => {
      expect(typeof apiRequest).toBe('function')
      expect(apiRequest('some-value')).toEqual({
        type: SWAPI_REQUEST,
        meta: {
          source: 'some-value'
        }
      })
    })

    it('provides a addErrorMetaData helper', () => {
      expect(typeof addErrorMetaData).toBe('function')
      expect(
        addErrorMetaData(null, null, {
          status: 500,
          statusText: 'error'
        })
      ).toEqual({
        status: 500,
        statusText: 'error'
      })
    })

    it('provides a errorHandler helper', () => {
      expect(typeof errorHandler).toBe('function')
      expect(errorHandler().type).toBe(SWAPI_FAILURE)
      expect(typeof errorHandler().meta).toBe('function')
    })
  })
  describe('getResources action', () => {
    it('provides a getResources action', () => {
      expect(typeof getResources).toBe('function')
      const apiAction = getResources()
      expect(typeof apiAction[RSAA]).toBe('object')
      expect(apiAction[RSAA].endpoint).toBe(`${process.env.REACT_APP_SWAPI_URL}api/`)
      expect(apiAction[RSAA].method).toBe('GET')
      expect(apiAction[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(apiAction[RSAA].types[1]).toBe(SWAPI_GET_RESOURCES_SUCCESS)
      expect(apiAction[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
  })
  describe('getItems action', () => {
    it('provides a getItems action', () => {
      expect(typeof getItems).toBe('function')
    })
    it('skips data loading if items are present', () => {
      const action = getItems('test', { test: { lastPage: 1 } })
      expect(action).toEqual({
        type: SWAPI_NO_OP
      })
    })
    it('skips data loading if lastPage is greater than requested page', () => {
      const action = getItems('test', { test: { lastPage: 3 } }, 2)
      expect(action).toEqual({
        type: SWAPI_NO_OP
      })
    })
    it('loads items if are not present', () => {
      const action = getItems('test', {})
      expect(typeof action[RSAA]).toBe('object')
      expect(action[RSAA].endpoint).toBe(`${process.env.REACT_APP_SWAPI_URL}api/test/?page=1`)
      expect(action[RSAA].method).toBe('GET')
      expect(action[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(action[RSAA].types[1].type).toBe(SWAPI_GET_ITEMS_SUCCESS)
      expect(action[RSAA].types[1].meta).toEqual({ resource: 'test', page: 1 })
      expect(action[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
    it('loads the next page', () => {
      const action = getItems('test', { test: { lastPage: 1 } }, 2)
      expect(typeof action[RSAA]).toBe('object')
      expect(action[RSAA].endpoint).toBe(`${process.env.REACT_APP_SWAPI_URL}api/test/?page=2`)
      expect(action[RSAA].method).toBe('GET')
      expect(action[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(action[RSAA].types[1].type).toBe(SWAPI_GET_ITEMS_SUCCESS)
      expect(action[RSAA].types[1].meta).toEqual({ resource: 'test', page: 2 })
      expect(action[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
  })
  describe('getItem action', () => {
    it('provides a getItem action', () => {
      expect(typeof getItem).toBe('function')
    })
    it('skips data loading if item is present', () => {
      const action = getItem('test', 1, { test: { results: [{ id: 1 }] } })
      expect(action).toEqual({
        type: SWAPI_NO_OP
      })
    })
    it('loads item if is not present', () => {
      const action = getItem('test', 1)
      expect(typeof action[RSAA]).toBe('object')
      expect(action[RSAA].endpoint).toBe(`${process.env.REACT_APP_SWAPI_URL}api/test/1/`)
      expect(action[RSAA].method).toBe('GET')
      expect(action[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(action[RSAA].types[1].type).toBe(SWAPI_GET_ITEM_SUCCESS)
      expect(action[RSAA].types[1].meta).toEqual({ resource: 'test' })
      expect(action[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
  })
  describe('getSchema action', () => {
    it('provides a getSchema action', () => {
      expect(typeof getSchema).toBe('function')
    })
    it('skips data loading if schema is present', () => {
      const action = getSchema('test', { test: {} })
      expect(action).toEqual({
        type: SWAPI_NO_OP
      })
    })
    it('loads item if is not present', () => {
      const action = getSchema('test')
      expect(typeof action[RSAA]).toBe('object')
      expect(action[RSAA].endpoint).toBe(`${process.env.REACT_APP_SWAPI_URL}api/test/schema`)
      expect(action[RSAA].method).toBe('GET')
      expect(action[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(action[RSAA].types[1].type).toBe(SWAPI_GET_SCHEMA_SUCCESS)
      expect(action[RSAA].types[1].meta).toEqual({ resource: 'test' })
      expect(action[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
  })
})

describe('swapi reducer', () => {
  it('provides a force reducer', () => {
    expect(typeof swapi).toBe('function')
  })
  it('should return the initial state', () => {
    expect(swapi(undefined, {})).toEqual(initialState)
  })
  describe('request and fetching', () => {
    it('puts the fetching flag on the request source', () => {
      expect(swapi(initialState, { type: SWAPI_REQUEST, meta: { source: 'test' } })).toEqual({
        ...initialState,
        fetching: { ...initialState.fetching, test: true }
      })
    })
  })
  describe('get resources success', () => {
    it('adds resources on success and removes the resources fetching flag', () => {
      expect(
        swapi(
          { ...initialState, fetching: { ...initialState.fetching, resources: true } },
          { type: SWAPI_GET_RESOURCES_SUCCESS, payload: { a: 'test', b: 'test' } }
        )
      ).toEqual({
        ...initialState,
        fetching: { ...initialState.fetching, resources: false },
        resources: [{ name: 'a', url: 'test' }, { name: 'b', url: 'test' }]
      })
    })
  })
  describe('get items success', () => {
    it('updates items last page', () => {
      const state = swapi(
        { ...initialState, items: { test: { results: [], lastPage: 1 } } },
        {
          type: SWAPI_GET_ITEMS_SUCCESS,
          meta: { page: 2, resource: 'test' },
          payload: { results: [{ url: '/test/1' }] }
        }
      )
      expect(typeof state.items.test).toBe('object')
      expect(state.items.test.lastPage).toBe(2)
    })
    it('adds items on success if they are not present creating id and resource', () => {
      const state = swapi(
        { ...initialState, items: { test: { results: [], lastPage: 1 } } },
        {
          type: SWAPI_GET_ITEMS_SUCCESS,
          meta: { page: 1, resource: 'test' },
          payload: {
            results: [{ name: 'a', url: '/test/1' }, { name: 'b', url: '/test/2' }]
          }
        }
      )
      expect(state).toEqual({
        ...initialState,
        items: {
          test: {
            lastPage: 1,
            results: [
              { id: 1, resource: 'test', name: 'a', url: '/test/1' },
              { id: 2, resource: 'test', name: 'b', url: '/test/2' }
            ]
          }
        }
      })
    })
    it('keeps items sorted by id', () => {
      const inputState = {
        ...initialState,
        items: {
          test: {
            results: [{ id: 2, resource: 'test', name: 'b', url: '/test/2' }],
            lastPage: 1
          }
        }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEMS_SUCCESS,
        meta: { page: 1, resource: 'test' },
        payload: { results: [{ name: 'a', url: '/test/1' }] }
      })
      expect(inputState.items.test.results.length).toBe(1)
      expect(inputState.items.test.results[0].id).toBe(2)
      expect(inputState.items.test.results[0].name).toBe('b')

      expect(outputState.items.test.results.length).toBe(2)
      expect(outputState.items.test.results[0].id).toBe(1)
      expect(outputState.items.test.results[0].name).toBe('a')
      expect(outputState.items.test.results[1].id).toBe(2)
      expect(outputState.items.test.results[1].name).toBe('b')
    })
    it('skips adding items if they are in place', () => {
      const inputState = {
        ...initialState,
        items: {
          test: {
            results: [{ id: 1, resource: 'test', name: 'a', url: '/test/1' }],
            lastPage: 1
          }
        }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEMS_SUCCESS,
        meta: { page: 1, resource: 'test' },
        payload: { results: [{ name: 'a', url: '/test/1' }] }
      })
      expect(inputState.items.test.results.length).toBe(1)
      expect(outputState.items.test.results.length).toBe(1)
    })
    it('removes the itemsPage fetching flag if it is loading page 1', () => {
      const inputState = {
        ...initialState,
        fetching: { ...initialState.fetching, itemsPage: true, itemsLoadMore: true }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEMS_SUCCESS,
        meta: { page: 1, resource: 'test' },
        payload: { results: [{ name: 'a', url: '/test/1' }] }
      })
      expect(inputState.fetching.itemsPage).toBe(true)
      expect(inputState.fetching.itemsLoadMore).toBe(true)
      expect(outputState.fetching.itemsPage).toBe(false)
      expect(outputState.fetching.itemsLoadMore).toBe(true)
    })
    it('removes the itemsLoadMore fetching flag if it is loading page other than 1', () => {
      const inputState = {
        ...initialState,
        fetching: { ...initialState.fetching, itemsPage: true, itemsLoadMore: true }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEMS_SUCCESS,
        meta: { page: 2, resource: 'test' },
        payload: { results: [{ name: 'a', url: '/test/1' }] }
      })
      expect(inputState.fetching.itemsPage).toBe(true)
      expect(inputState.fetching.itemsLoadMore).toBe(true)
      expect(outputState.fetching.itemsPage).toBe(true)
      expect(outputState.fetching.itemsLoadMore).toBe(false)
    })
  })
  describe('get item success', () => {
    it('adds item in items set on success if it is not present creating id and resource', () => {
      const state = swapi(
        { ...initialState, items: { test: { results: [{ id: 1, resource: 'test', name: 'a', url: '/test/1' }] } } },
        {
          type: SWAPI_GET_ITEM_SUCCESS,
          meta: { resource: 'test' },
          payload: { name: 'b', url: '/test/2' }
        }
      )
      expect(state).toEqual({
        ...initialState,
        items: {
          test: {
            results: [
              { id: 1, resource: 'test', name: 'a', url: '/test/1' },
              { id: 2, resource: 'test', name: 'b', url: '/test/2' }
            ]
          }
        }
      })
    })
    it('keeps items sorted by id', () => {
      const inputState = {
        ...initialState,
        items: { test: { results: [{ id: 2, resource: 'test', name: 'b', url: '/test/2' }] } }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEM_SUCCESS,
        meta: { resource: 'test' },
        payload: { name: 'a', url: '/test/1' }
      })
      expect(inputState.items.test.results.length).toBe(1)
      expect(inputState.items.test.results[0].id).toBe(2)
      expect(inputState.items.test.results[0].name).toBe('b')

      expect(outputState.items.test.results.length).toBe(2)
      expect(outputState.items.test.results[0].id).toBe(1)
      expect(outputState.items.test.results[0].name).toBe('a')
      expect(outputState.items.test.results[1].id).toBe(2)
      expect(outputState.items.test.results[1].name).toBe('b')
    })
    it('skips adding item if it is in place', () => {
      const inputState = {
        ...initialState,
        items: { test: { results: [{ id: 1, resource: 'test', name: 'a', url: '/test/1' }] } }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEM_SUCCESS,
        meta: { resource: 'test' },
        payload: { name: 'a', url: '/test/1' }
      })
      expect(inputState.items.test.results.length).toBe(1)
      expect(outputState.items.test.results.length).toBe(1)
    })
    it('removes the singleItem fetching flag', () => {
      const inputState = {
        ...initialState,
        fetching: { ...initialState.fetching, singleItem: true }
      }
      const outputState = swapi(inputState, {
        type: SWAPI_GET_ITEM_SUCCESS,
        meta: { resource: 'test' },
        payload: { name: 'a', url: '/test/1' }
      })
      expect(inputState.fetching.singleItem).toBe(true)
      expect(outputState.fetching.singleItem).toBe(false)
    })
  })
  describe('get schema success', () => {
    it('adds schema on success and removes the schema fetching flag', () => {
      expect(
        swapi(
          { ...initialState, fetching: { ...initialState.fetching, schema: true } },
          { type: SWAPI_GET_SCHEMA_SUCCESS, meta: { resource: 'test' }, payload: 1 }
        )
      ).toEqual({
        ...initialState,
        fetching: { ...initialState.fetching, schema: false },
        schemas: {
          test: 1
        }
      })
    })
  })
})
