import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import { NavLink } from 'react-router-dom'
import withFixedHeader from './withFixedHeader'
import ForceSideSwitch from '../ForceSideSwitch'

describe('withFixedHeader High Order Component', () => {
  it('renders without crashing', () => {
    const component = props => <div />
    const EnanchedComponent = withFixedHeader(component)
    shallow(<EnanchedComponent />)
  })
  it('adds fixed header to the content', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(<EnanchedComponent />)
    expect(component).toBePresent(<header className="fixed-header" />)
    expect(component).toBePresent(<div className="fixed-header-content" />)
    expect(component).toBePresent(<p>content</p>)
  })
  it('has a button to toggle sidebar visibility', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const setActiveSidebar = jest.fn()
    const preventDefault = jest.fn()
    const component = shallow(<EnanchedComponent setActiveSidebar={setActiveSidebar} />)
    const spy = jest.spyOn(EnanchedComponent.prototype, 'toggleSidebar')
    expect(component).toBePresent(<div className="toggleSidebar" />)
    component.find('.toggleSidebar a').simulate('click', { preventDefault })
    expect(spy).toHaveBeenCalled()
    expect(preventDefault).toHaveBeenCalled()
    expect(setActiveSidebar).toHaveBeenCalled()
  })
  it('has a Home link', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(<EnanchedComponent />)
    expect(component).toBePresent(<div className="home-link" />)
    expect(component.find('.home-link')).toBePresent(<NavLink to="/" />)
  })
  it('has the force side switch', () => {
    const setForceSide = jest.fn()
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withFixedHeader(simpleComponent)
    const component = shallow(<EnanchedComponent setForceSide={setForceSide} force="light" />)
    expect(component).toBePresent(<ForceSideSwitch />)
  })
})
