// Constants
const API_IS_FETCHING = '@@API/IS_FETCHING'
const API_FINISH_CALL = '@@API/FINISH_CALL'

// Utilities
const errorHandler = (dispatch, response, error) => {
  dispatch({ type: API_FINISH_CALL })
  if (typeof error === 'function') {
    error(response, dispatch)
  } else {
    throw new Error('Error on response')
  }
}

// Actions
export const apiCall = (url, options, success, error) => {
  return async dispatch => {
    dispatch({ type: API_IS_FETCHING })
    let response
    try {
      response = await fetch(url, options)

      try {
        const data = await response.json()
        dispatch({ type: API_FINISH_CALL })
        if (typeof success === 'function') {
          dispatch(success(data))
        }
      } catch (e) {
        errorHandler(dispatch, response, error)
      }
    } catch (e) {
      errorHandler(dispatch, response, error)
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
