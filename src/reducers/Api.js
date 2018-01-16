// Constants
const API_IS_FETCHING = '@@API/IS_FETCHING'
const API_FINISH_CALL = '@@API/FINISH_CALL'

// Actions
export const apiCall = (url, options, success, error) => {
  return async dispatch => {
    dispatch({ type: API_IS_FETCHING })
    try {
      const resources = await fetch(url, options)
      const data = await resources.json()
      dispatch({ type: API_FINISH_CALL })
      if (typeof success === 'function') {
        dispatch(success(data))
      }
    } catch (e) {
      dispatch({ type: API_FINISH_CALL })
      if (typeof error === 'function') {
        error(e)
      } else {
        throw new Error(e)
      }
    }
  }
}

// Initial State
export const initialState = {
  fetchingItems: 0
}

// Reducer
export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_IS_FETCHING:
      return { ...state, fetchingItems: state.fetchingItems + 1 }
    case API_FINISH_CALL:
      return { ...state, fetchingItems: state.fetchingItems - 1 }
    default:
      return state
  }
}
