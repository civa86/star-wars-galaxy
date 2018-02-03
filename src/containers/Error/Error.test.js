import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Error from './index'
import ErrorMessage from '../../components/ErrorMessage'

describe('Error Container', () => {
  it('renders without crashing', () => {
    shallow(<Error />)
  })
  it('renders Loader if fetchingItems is greater than zero', () => {
    const app = shallow(<Error />)
    expect(app).toContainReact(<ErrorMessage message="Something went wrong :(" />)
  })
})
