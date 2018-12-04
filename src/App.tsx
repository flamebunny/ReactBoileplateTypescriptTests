import * as React from 'react'
import Movies from './components/movies/movies'
import GetMoviesButton from './components/getMoviesButton/getMoviesButton'

// TODO: Use fragments?
export const App = () => (
  <div>
    <Movies />
    <GetMoviesButton />
  </div>
)