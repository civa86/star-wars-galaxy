import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import withSidebar from './withSidebar'

describe('withSidebar High Order Component', () => {
  it('renders without crashing', () => {
    const component = props => <div />
    const EnanchedComponent = withSidebar(component)
    shallow(<EnanchedComponent />)
  })
  it('adds sidebar to the content', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withSidebar(simpleComponent)
    const component = shallow(<EnanchedComponent />)
    expect(component).toBePresent(<div className="sidebar" />)
    expect(component).toBePresent(<div className="content" />)
  })
})
