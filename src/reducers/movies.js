const defaultState = {
  fetching: false,
  movies: [],
  errorMessage: ''
}

export function moviesReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.movies
      }

    case 'MOVIES_FETCH':
      return {
        ...state,
        fetching: true
      }

    case 'MOVIES_FETCH_SUCCESS':
      return {
        ...state,
        fetching: false,
        errorMessage: '',
        movies: action.movies
      }

    case 'MOVIES_FETCH_FAILED':
      return {
        ...state,
        fetching: false,
        errorMessage: action.errorMessage
      }

    default:
      return state
  }
}