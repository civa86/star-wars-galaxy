// Constants
const FORCE_SET_SIDE = 'FORCE_SET_SIDE'

// Actions
export const setForceSide = side => ({
  type: FORCE_SET_SIDE,
  side
})

// Initial State
export const initialState = {
  side: 'light'
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FORCE_SET_SIDE:
      return {
        ...state,
        side: action.side.match(/light|dark/) ? action.side : state.side
      }
    default:
      return state
  }
}
