import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import 'jest-enzyme'
import { Movies } from './movies'
import { LoadingStyled } from './movies.styles'
import { Movie } from '../movie/movie'

interface MovieListProps {
  id: number
  title: string
  releaseYear: number
}

const movies: MovieListProps[] = [
  { id: 1, title: 'Star Wars', releaseYear: 1977 },
  { id: 2, title: 'Back to the Future', releaseYear: 1985 },
  { id: 3, title: 'The Matrix', releaseYear: 1999 },
  { id: 4, title: 'Inception', releaseYear: 2010 },
  { id: 5, title: 'Interstellar', releaseYear: 2014 }
]

describe('The Movies component', () => {
  describe('When rendered', () => {
    let component: ReactWrapper

    beforeEach(() => {
      component = mount(<Movies movies={movies} fetching={false} />)
    })

    afterEach(() => {
      if (component) {
        component.unmount()
        jest.resetAllMocks()
      }
    })

    it('Matches the snapshot', () => {
      expect(component).toMatchSnapshot()
    })

  })

  describe('When fetching is true', () => {
    describe('When rendered', () => {
      let component: ReactWrapper

      beforeEach(() => {
        component = mount(<Movies movies={[]} fetching={true} />)
      })

      afterEach(() => {
        if (component) {
          component.unmount()
          jest.resetAllMocks()
        }
      })

      it('Renders loading signal', () => {
        expect(component.find(LoadingStyled).text()).toBe('Loading Movies')
      })

    })
  })

  describe('When Movies are available', () => {
    describe('When rendered', () => {
      let component: ReactWrapper

      beforeEach(() => {
        component = mount(<Movies movies={movies} fetching={false} />)
      })

      afterEach(() => {
        if (component) {
          component.unmount()
          jest.resetAllMocks()
        }
      })

      it('Display 5 movie list items', () => {
        expect(component.find(Movie).length).toEqual(5)
      })

    })
  })
})
