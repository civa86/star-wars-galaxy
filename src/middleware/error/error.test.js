import error from './index'
import { push } from 'react-router-redux'

describe('error middleware', () => {
  const dispatchSpy = jest.fn()
  const nextHandler = error({ dispatch: dispatchSpy })

  it('must return a function to handle next', () => {
    expect(typeof nextHandler).toBe('function')
    expect(nextHandler.length).toBe(1)
  })

  describe('handle next', () => {
    const nextSpy = jest.fn(action => 'next-action')
    const actionHandler = nextHandler(nextSpy)

    it('must return a function to handle action', () => {
      expect(typeof actionHandler).toBe('function')
      expect(actionHandler.length).toBe(1)
    })

    describe('handle action', () => {
      it('must call the function passed to handle next', () => {
        const result = actionHandler()
        expect(nextSpy).toHaveBeenCalled()
        expect(result).toBe('next-action')
      })

      it('let pass any action', () => {
        const result = actionHandler({
          type: 'ANY_ACTION'
        })
        expect(result).toBe('next-action')
      })

      it('must handle the SWAPI_FAILURE action with no meta data', () => {
        const result = actionHandler({
          type: 'SWAPI_FAILURE'
        })
        expect(dispatchSpy).toHaveBeenCalled()
        expect(dispatchSpy).toHaveBeenCalledWith(push('/error'))
      })

      it('must handle the SWAPI_FAILURE action with 500 status', () => {
        const result = actionHandler({
          type: 'SWAPI_FAILURE',
          meta: { status: 500 }
        })
        expect(dispatchSpy).toHaveBeenCalled()
        expect(dispatchSpy).toHaveBeenCalledWith(push('/error'))
      })

      it('must handle the SWAPI_FAILURE action with 404 status', () => {
        const result = actionHandler({
          type: 'SWAPI_FAILURE',
          meta: { status: 404 }
        })
        expect(dispatchSpy).toHaveBeenCalled()
        expect(dispatchSpy).toHaveBeenCalledWith(push('/404'))
      })
    })
  })
})
