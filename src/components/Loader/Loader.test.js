import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Loader from './index'
import ErrorMessage from '../ErrorMessage'
import StarWarsIcon from '../Icon/StarWarsIcon'

describe('Loader Component', () => {
  it('renders without crashing', () => {
    shallow(<Loader />)
  })
  it('renders ErrorMessage if an error prop is passed', () => {
    const component = shallow(<Loader error />)
    expect(component).toContainReact(<ErrorMessage message="App loading error" />)
  })
  it('has the loader class', () => {
    const component = shallow(<Loader />)
    expect(component).toHaveClassName('loader')
  })
  it('renders the StarWarsIcon', () => {
    const component = shallow(<Loader />)
    const icon = <StarWarsIcon icon="placeholder" />
    expect(component).toContainReact(icon)
  })
})
