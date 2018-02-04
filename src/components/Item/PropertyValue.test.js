import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ItemPropertyValue from './PropertyValue'

describe('ItemPropertyValue Component', () => {
  it('renders without crashing', () => {
    shallow(<ItemPropertyValue value="" />)
  })
  it('return value if value prop is not a url', () => {
    const component = shallow(<ItemPropertyValue value="test" />)
    expect(component).toContainReact(<span>test</span>)
  })
  it('return the ItemLoaderSingle if value prop is a url', () => {
    const url = 'https://swapi.co/api/species/1/'
    const component = shallow(<ItemPropertyValue value={url} />)
    expect(component.find('Connect(ItemLoaderSingle)')).toHaveLength(1)
  })
})
