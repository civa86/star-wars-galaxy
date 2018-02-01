import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ThemeColor from './ThemeColor'

describe('ThemeColor Component', () => {
  it('renders without crashing', () => {
    shallow(<ThemeColor />)
  })
  it('wraps children', () => {
    const children = <div>children</div>
    const component = shallow(<ThemeColor>{children}</ThemeColor>)
    expect(component).toContainReact(children)
  })
})
