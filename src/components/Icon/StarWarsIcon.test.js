import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import StarWarsIcon from './StarWarsIcon'

describe('StarWarsIcon Component', () => {
  it('renders without crashing', () => {
    shallow(<StarWarsIcon icon="" />)
  })
  it('renders the icon passed in props', () => {
    const component = shallow(<StarWarsIcon icon="some-icon" />)
    expect(component).toContainReact(<i aria-hidden="true" className="swg some-icon" />)
  })
})
