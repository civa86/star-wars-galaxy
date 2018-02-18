import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ExternalLinks from './index'

describe('ExternalLinks Component', () => {
  it('renders without crashing', () => {
    shallow(<ExternalLinks />)
  })
  it('renders a list with 2 links', () => {
    const component = shallow(<ExternalLinks />)
    expect(component.find('ul').length).toBe(1)
    expect(component.find('ul li').length).toBe(2)
    expect(component.find('a').length).toBe(2)
  })
  it('renders the swapi link', () => {
    const component = shallow(<ExternalLinks />)
    expect(component.find('a[href="https://github.com/civa86/star-wars-galaxy"]').length).toBe(1)
  })
  it('renders the github link', () => {
    const component = shallow(<ExternalLinks />)
    expect(component.find('a[href="https://swapi.co/"]').length).toBe(1)
  })
})
