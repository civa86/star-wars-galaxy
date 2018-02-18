import force, { FORCE_SET_SIDE, initialState, setForceSide } from './index'

describe('force actions', () => {
  it('provides a setForceSide action', () => {
    expect(typeof setForceSide).toBe('function')
    expect(setForceSide('anything')).toEqual({
      type: FORCE_SET_SIDE,
      side: 'anything'
    })
  })
})

describe('force reducer', () => {
  it('provides a force reducer', () => {
    expect(typeof force).toBe('function')
  })
  it('should return the initial state', () => {
    expect(force(undefined, {})).toEqual(initialState)
  })
  it('changes the side value if input matches light|dark', () => {
    expect(force(initialState, { type: FORCE_SET_SIDE, side: 'light' })).toEqual({ side: 'light' })
    expect(force(initialState, { type: FORCE_SET_SIDE, side: 'dark' })).toEqual({ side: 'dark' })
  })
  it("doesn't change the side value if input is not valid", () => {
    expect(force(initialState, { type: FORCE_SET_SIDE, side: 'not_valid_input' })).toEqual({ side: 'light' })
    expect(force({ side: 'dark' }, { type: FORCE_SET_SIDE, side: 'not_valid_input' })).toEqual({ side: 'dark' })
  })
})
