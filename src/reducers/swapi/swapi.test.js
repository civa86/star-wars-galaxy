import { RSAA } from 'redux-api-middleware'
import swapi, {
//CONSTANTS
  API_DOMAIN,
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

  it('provides a getResources action', () => {
    expect(typeof getResources).toBe('function')
    const apiAction = getResources()
    expect(typeof apiAction[RSAA]).toBe('object')
    expect(apiAction[RSAA].endpoint).toBe(API_DOMAIN + '/api/')
    expect(apiAction[RSAA].method).toBe('GET')
    expect(apiAction[RSAA].types[0].type).toBe(SWAPI_REQUEST)
    expect(apiAction[RSAA].types[1]).toBe(SWAPI_GET_RESOURCES_SUCCESS)
    expect(apiAction[RSAA].types[2].type).toBe(SWAPI_FAILURE)
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
      expect(action[RSAA].endpoint).toBe(API_DOMAIN + '/api/test/?page=1')
      expect(action[RSAA].method).toBe('GET')
      expect(action[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(action[RSAA].types[1].type).toBe(SWAPI_GET_ITEMS_SUCCESS)
      expect(action[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
    it('loads the next page', () => {
      const action = getItems('test', { test: { lastPage: 1 } }, 2)
      expect(typeof action[RSAA]).toBe('object')
      expect(action[RSAA].endpoint).toBe(API_DOMAIN + '/api/test/?page=2')
      expect(action[RSAA].method).toBe('GET')
      expect(action[RSAA].types[0].type).toBe(SWAPI_REQUEST)
      expect(action[RSAA].types[1].type).toBe(SWAPI_GET_ITEMS_SUCCESS)
      expect(action[RSAA].types[2].type).toBe(SWAPI_FAILURE)
    })
  })
})

// describe('force reducer', () => {
//   it('provides a force reducer', () => {
//     expect(typeof force).toBe('function')
//   })
//   it('should return the initial state', () => {
//     expect(force(undefined, {})).toEqual(initialState)
//   })
//   it('changes the side value if input matches light|dark', () => {
//     expect(force(initialState, { type: 'FORCE_SET_SIDE', side: 'light' })).toEqual({ side: 'light' })
//     expect(force(initialState, { type: 'FORCE_SET_SIDE', side: 'dark' })).toEqual({ side: 'dark' })
//   })
//   it("doesn't change the side value if input is not valid", () => {
//     expect(force(initialState, { type: 'FORCE_SET_SIDE', side: 'not_valid_input' })).toEqual({ side: 'light' })
//     expect(force({ side: 'dark' }, { type: 'FORCE_SET_SIDE', side: 'not_valid_input' })).toEqual({ side: 'dark' })
//   })
// })
