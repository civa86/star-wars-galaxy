import sidebar, { initialState, setActiveSidebar } from './sidebar'

describe('sidebar actions', () => {
  it('provides a setActiveSidebar action', () => {
    expect(typeof setActiveSidebar).toBe('function')
    expect(setActiveSidebar('anything')).toEqual({
      type: 'SIDEBAR_SET_ACTIVE',
      active: 'anything'
    })
  })
})

describe('sidebar reducer', () => {
  it('provides a sidebar reducer', () => {
    expect(typeof sidebar).toBe('function')
  })
  it('should return the initial state', () => {
    expect(sidebar(undefined, {})).toEqual(initialState)
  })
  it('changes the active value if input is boolean', () => {
    expect(sidebar(initialState, { type: 'SIDEBAR_SET_ACTIVE', active: true })).toEqual({ active: true })
    expect(sidebar(initialState, { type: 'SIDEBAR_SET_ACTIVE', active: false })).toEqual({ active: false })
  })
  it("doesn't change the active value if input is not a boolean", () => {
    expect(sidebar(initialState, { type: 'SIDEBAR_SET_ACTIVE', active: 'not_valid_input' })).toEqual({ active: false })
    expect(sidebar({ active: true }, { type: 'SIDEBAR_SET_ACTIVE', active: 'not_valid_input' })).toEqual({
      active: true
    })
  })
})
