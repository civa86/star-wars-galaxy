import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import NotFound from './index'
import ErrorMessage from '../../components/ErrorMessage'

describe('NotFound Container', () => {
  it('renders without crashing', () => {
    shallow(<NotFound />)
  })
  it('renders Loader if fetchingItems is greater than zero', () => {
    const app = shallow(<NotFound />)
    expect(app).toContainReact(<ErrorMessage message="Page not found" />)
  })
})
