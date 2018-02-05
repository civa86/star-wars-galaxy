import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ThemeColor from './ThemeColor'

describe('ThemeColor Component', () => {
  it('renders without crashing', () => {
    shallow(<ThemeColor color="color" children="" />)
  })
  it('wraps children', () => {
    const children = <div>children</div>
    const component = shallow(<ThemeColor color="color">{children}</ThemeColor>)
    expect(component).toContainReact(children)
  })
  it('calls setClassName on mount', () => {
    const spy = jest.spyOn(ThemeColor.prototype, 'setClassName')
    const component = shallow(<ThemeColor color="red" children="" />)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('red')
  })
  it('calls setClassName on props update', () => {
    const spy = jest.spyOn(ThemeColor.prototype, 'setClassName')
    const component = shallow(<ThemeColor color="red" children="" />)
    component.setProps({ color: 'blue' })
    expect(spy).toHaveBeenCalledWith('blue')
  })
})
