import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Switch from 'react-switch'
import ForceSideSwitch from './index'

describe('ForceSideSwitch Component', () => {
  it('renders without crashing', () => {
    shallow(<ForceSideSwitch side="light" />)
  })
  it('has the Switch component', () => {
    const component = shallow(<ForceSideSwitch side="light" />)
    expect(component).toBePresent(<label />)
    expect(component).toBePresent(<Switch checked={true} onChange={() => true} />)
  })
  it('switch force side from light to dark', () => {
    const spy = jest.fn()
    const component = shallow(<ForceSideSwitch side="light" changeForceSide={spy} />)
    component.find('#force-side-switch').simulate('change')
    expect(spy).toBeCalled()
    expect(spy).toBeCalledWith('dark')
  })
  it('switch force side from dark to light', () => {
    const spy = jest.fn()
    const component = shallow(<ForceSideSwitch side="dark" changeForceSide={spy} />)
    component.find('#force-side-switch').simulate('change')
    expect(spy).toBeCalled()
    expect(spy).toBeCalledWith('light')
  })
})
