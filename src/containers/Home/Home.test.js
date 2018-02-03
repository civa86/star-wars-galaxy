import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import { NavLink } from 'react-router-dom'
import { Home } from './index'
import ForceSideSwitch from '../../components/ForceSideSwitch'

describe('Home Container', () => {
  it('renders without crashing', () => {
    shallow(<Home force={{ side: 'light' }} resources={[]} />)
  })
  it('has the force side switch', () => {
    const component = shallow(<Home force={{ side: 'light' }} resources={[]} />)
    expect(component).toBePresent(<ForceSideSwitch />)
  })
  it('render no resources if not passed in prop', () => {
    const resources = []
    const component = shallow(<Home force={{ side: 'light' }} resources={resources} />)
    expect(component.find('.resources ul')).toContainReact(<ul className="list-unstyled row" />)
  })
  it('render resources passed in prop', () => {
    const resources = [{ name: 'A', name: 'B' }]
    const component = shallow(<Home force={{ side: 'light' }} resources={resources} />)
  })
})
