import * as React from 'react'
import { connect } from 'react-redux'
import { Movie } from '../movie/movie'
import { LoadingStyled } from './movies.styles'

export const Movies = ({ fetching, movies }) => {
  return (
    <div>
      {fetching && <LoadingStyled>Loading Movies</LoadingStyled>}
      Awesome
      {movies && movies.map(movie => <Movie key={movie.id} {...movie} />)}
    </div>
  )
}

export default connect(state => state.movies)(Movies)
