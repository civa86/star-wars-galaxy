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
  it('calls setClassName on mount', () => {
    const spy = jest.spyOn(ThemeColor.prototype, 'setClassName')
    const component = shallow(<ThemeColor color="red" />)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('red')
  })
  it('calls setClassName on props update', () => {
    const spy = jest.spyOn(ThemeColor.prototype, 'setClassName')
    const component = shallow(<ThemeColor color="red" />)
    component.setProps({ color: 'blue' })
    expect(spy).toHaveBeenCalledWith('blue')
  })
})
