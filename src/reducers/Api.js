// Constants
const API_IS_FETCHING = '@@API/IS_FETCHING'
const API_FINISH_CALL = '@@API/FINISH_CALL'

// Functions
export const isUrl = str => {
  var pattern = new RegExp(
    '^((https?:)?\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locater
  if (!pattern.test(str)) {
    return false
  } else {
    return true
  }
}

// Utilities
const errorHandler = (dispatch, response, error) => {
  console.log(error)
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
