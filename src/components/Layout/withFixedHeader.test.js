import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import { NavLink } from 'react-router-dom'
import withFixedHeader from './withFixedHeader'
import ForceSideSwitch from '../ForceSideSwitch'

describe('withFixedHeader High Order Component', () => {
  it('renders without crashing', () => {
    const simpleComponent = () => <div />
    const EnanchedComponent = withFixedHeader(simpleComponent)
    shallow(
      <EnanchedComponent
        setActiveSidebar={() => 1}
        sidebarIsActive={true}
        force={{ side: 'light' }}
        setForceSide={() => 1}
      />
    )
  })
  it('adds fixed header to the content', () => {
    const simpleComponent = () => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(
      <EnanchedComponent
        setActiveSidebar={() => 1}
        sidebarIsActive={true}
        force={{ side: 'light' }}
        setForceSide={() => 1}
      />
    )
    expect(component.find('header')).toBePresent()
    expect(component.find('header').length).toBe(1)
    expect(component.find('header')).toHaveClassName('fixed-header')
    expect(component.find('.fixed-header-content')).toBePresent()
    expect(component.find('.fixed-header-content').length).toBe(1)
  })
  it('has a button to toggle sidebar visibility', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const setActiveSidebar = jest.fn()
    const preventDefault = jest.fn()
    const component = shallow(
      <EnanchedComponent
        setActiveSidebar={setActiveSidebar}
        sidebarIsActive={true}
        force={{ side: 'light' }}
        setForceSide={() => 1}
      />
    )
    const spy = jest.spyOn(EnanchedComponent.prototype, 'toggleSidebar')
    expect(component.find('.toggleSidebar')).toBePresent()
    expect(component.find('.toggleSidebar').length).toBe(1)
    component.find('.toggleSidebar a').simulate('click', { preventDefault })
    expect(spy).toHaveBeenCalled()
    expect(preventDefault).toHaveBeenCalled()
    expect(setActiveSidebar).toHaveBeenCalled()
  })
  it('has a Home link', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(
      <EnanchedComponent
        setActiveSidebar={() => 1}
        sidebarIsActive={true}
        force={{ side: 'light' }}
        setForceSide={() => 1}
      />
    )
    expect(component.find('.home-link')).toBePresent()
    expect(component.find('.home-link').find(NavLink)).toBePresent()
  })
  it('has the force side switch', () => {
    const setForceSide = jest.fn()
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(
      <EnanchedComponent
        setForceSide={setForceSide}
        force={{ side: 'light' }}
        setActiveSidebar={() => 1}
        sidebarIsActive={true}
      />
    )
    expect(component.find(ForceSideSwitch)).toBePresent()
  })
})
