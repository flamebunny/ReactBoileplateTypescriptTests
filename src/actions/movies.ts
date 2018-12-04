import { fetchJsonFromApi, MoviesProps, getPostParameters } from '../api'

export const GET_MOVIES = 'GET_MOVIES'
export function getMovies(movies) {
  return {
    type:  GET_MOVIES,
    movies: [{ title: 'Lord of The Rings' }, { title: 'The Matrix' }]
  }
}

export const MOVIES_FETCH = 'MOVIES_FETCH'
export function moviesFetch() {
  return {
    type: MOVIES_FETCH
  }
}

export interface GetSuperPicksRequest {
  FixtureDate: string
  FixtureId: string
  RaceNumber: number
  StarterNumber: number
  PropositionSeq?: string
}

export function getMovieList(request: GetSuperPicksRequest): Promise<MoviesProps> {
  return fetchJsonFromApi<MoviesProps>('https://facebook.github.io/react-native/movies.json', getPostParameters(request))
    .catch(async error => {
      const errorResponse = await error.response.json()
      throw {
        response: errorResponse
      }
    })
}

export const MOVIES_FETCH_ASYNC = 'MOVIES_FETCH_ASYNC'
export function moviesFetchAsync() {

  const request: GetSuperPicksRequest = {
    FixtureDate: '',
    FixtureId: '',
    RaceNumber: 0,
    StarterNumber: 0,
    PropositionSeq: 'test' || null
  }

  return (dispatch, getStore) => {
    if (getStore().fetching) {
      return
    }
    console.log('bbbb')
    dispatch(moviesFetch())
    console.log('cccc')
    getMovieList(request)
      .then(response => dispatch(moviesFetchSuccess(response)))
      .catch(error => dispatch(moviesFetchFailed({ error })))
  }

}

export const MOVIES_FETCH_SUCCESS = 'MOVIES_FETCH_SUCCESS'
export function moviesFetchSuccess({ movies }) {
  return {
    type: MOVIES_FETCH_SUCCESS,
    movies
  }
}

export const MOVIES_FETCH_FAILED = 'MOVIES_FETCH_FAILED'
export function moviesFetchFailed({ error }) {
  return {
    type: MOVIES_FETCH_FAILED,
    errorMessage: error.message
  }
}
