import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ItemPropertyLabel from './PropertyLabel'

describe('ItemPropertyLabel Component', () => {
  it('renders without crashing', () => {
    shallow(<ItemPropertyLabel label="" />)
  })
  it('transforms label', () => {
    const label = 'first_second_third'
    const component = shallow(<ItemPropertyLabel label={label} />)
    expect(component).toContainReact(<span>First Second Third</span>)
  })
})
