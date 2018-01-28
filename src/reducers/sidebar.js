// Constants
const SIDEBAR_SET_ACTIVE = 'SIDEBAR_SET_ACTIVE'

// Actions
export const setActiveSidebar = active => ({
  type: SIDEBAR_SET_ACTIVE,
  active
})

// Initial State
export const initialState = {
  active: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_SET_ACTIVE:
      return {
        ...state,
        active: action.active === true ? true : false
      }
    default:
      return state
  }
}
