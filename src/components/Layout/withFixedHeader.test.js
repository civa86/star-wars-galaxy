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
  it('can be unmounted without crashing', () => {
    const simpleComponent = () => <div />
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(
      <EnanchedComponent
        setActiveSidebar={() => 1}
        sidebarIsActive={true}
        force={{ side: 'light' }}
        setForceSide={() => 1}
      />
    )
    component.unmount()
  })
  describe('onWindowScroll', () => {
    it('adds shadow class to header if content is not scrolled', () => {
      const simpleComponent = () => <div />
      const EnanchedComponent = withFixedHeader(simpleComponent)
      const component = shallow(
        <EnanchedComponent
          setActiveSidebar={() => 1}
          sidebarIsActive={true}
          force={{ side: 'light' }}
          setForceSide={() => 1}
        />
      )
      const addClassSpy = jest.fn()
      const removeClassSpy = jest.fn()

      document.querySelector = jest.fn(selector => {
        if (selector === '.fixed-header-content') {
          return {
            getBoundingClientRect: () => ({ x: 0, y: 0 }),
            offsetTop: 10
          }
        }
        if (selector === '.fixed-header') {
          return {
            classList: {
              add: addClassSpy,
              remove: removeClassSpy
            }
          }
        }
      })
      component.instance().onWindowScroll()
      expect(removeClassSpy).not.toHaveBeenCalled()
      expect(addClassSpy).toHaveBeenCalled()
      expect(addClassSpy).toHaveBeenCalledWith('shadow')
    })
    it('removes shadow class to header if content is not scrolled', () => {
      const simpleComponent = () => <div />
      const EnanchedComponent = withFixedHeader(simpleComponent)
      const component = shallow(
        <EnanchedComponent
          setActiveSidebar={() => 1}
          sidebarIsActive={true}
          force={{ side: 'light' }}
          setForceSide={() => 1}
        />
      )
      const addClassSpy = jest.fn()
      const removeClassSpy = jest.fn()

      document.querySelector = jest.fn(selector => {
        if (selector === '.fixed-header-content') {
          return {
            getBoundingClientRect: () => ({ x: 0, y: 0 }),
            offsetTop: 0
          }
        }
        if (selector === '.fixed-header') {
          return {
            classList: {
              add: addClassSpy,
              remove: removeClassSpy
            }
          }
        }
      })
      component.instance().onWindowScroll()
      expect(addClassSpy).not.toHaveBeenCalled()
      expect(removeClassSpy).toHaveBeenCalled()
      expect(removeClassSpy).toHaveBeenCalledWith('shadow')
    })
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
    expect(component.find('header')).toExist()
    expect(component.find('header').length).toBe(1)
    expect(component.find('header')).toHaveClassName('fixed-header')
    expect(component.find('.fixed-header-content')).toExist()
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
    expect(component.find('.toggleSidebar')).toExist()
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
    expect(component.find('.home-link')).toExist()
    expect(component.find('.home-link').find(NavLink)).toExist()
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
    expect(component.find(ForceSideSwitch)).toExist()
    component
      .find(ForceSideSwitch)
      .dive()
      .find('#force-side-switch')
      .simulate('change')
    expect(setForceSide).toHaveBeenCalled()
    expect(setForceSide).toHaveBeenCalledWith('dark')
  })
})
