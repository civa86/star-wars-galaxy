import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Label from './Label'

describe('Label Component', () => {
  it('renders without crashing', () => {
    shallow(<Label label="" />)
  })
  it('transforms label', () => {
    const label = 'first_second_third'
    const component = shallow(<Label label={label} />)
    expect(component).toContainReact(<span>First Second Third</span>)
  })
})
