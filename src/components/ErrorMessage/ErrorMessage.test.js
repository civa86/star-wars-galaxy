import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ErrorMessage from './index'
import StarWarsIcon from '../Icon/StarWarsIcon'

describe('ErrorMessage Component', () => {
  it('renders without crashing', () => {
    shallow(<ErrorMessage />)
  })
  it('has the error class', () => {
    const component = shallow(<ErrorMessage />)
    expect(component).toHaveClassName('error')
  })
  it('renders the StarWarsIcon', () => {
    const component = shallow(<ErrorMessage />)
    const icon = <StarWarsIcon icon="swg-lightsabers" />
    expect(component).toContainReact(icon)
  })
  it('renders the default error message if no prop is passed', () => {
    const component = shallow(<ErrorMessage />)
    const message = <p className="msg">Error</p>
    expect(component).toContainReact(message)
  })
  it('renders the props error message if is passed', () => {
    const component = shallow(<ErrorMessage message="test" />)
    const message = <p className="msg">test</p>
    expect(component).toContainReact(message)
  })
})
