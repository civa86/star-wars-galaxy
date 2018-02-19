import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import withSidebar from './withSidebar'
import Loader from '../Loader'

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
    expect(component.find('.sidebar')).toBePresent()
    expect(component.find('.sidebar').length).toBe(1)
    expect(component.find('.content')).toBePresent()
    expect(component.find('.content').length).toBe(1)
  })
  it('renders sidebar items passed in props', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withSidebar(simpleComponent)
    const component = shallow(<EnanchedComponent sidebarItems={[{ name: 'a' }, { name: 'b' }]} />)
  })
  it('is active depending on sidebarIsActive prop', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withSidebar(simpleComponent)
    const componentActive = shallow(<EnanchedComponent sidebarIsActive={true} />)
    const componentUnactive = shallow(<EnanchedComponent sidebarIsActive={false} />)
    expect(componentActive.find('.sidebar-layout-wrapper')).toHaveClassName('active')
    expect(componentUnactive.find('.sidebar-layout-wrapper')).not.toHaveClassName('active')
  })
  it('renders Loader if isFetchingResources prop is true', () => {
    const simpleComponent = props => <p>content</p>
    const EnanchedComponent = withSidebar(simpleComponent)
    const componentFetching = shallow(<EnanchedComponent isFetchingResources={true} />)
    const componentNotFetching = shallow(<EnanchedComponent isFetchingResources={false} />)
    expect(componentFetching.find(Loader)).toBePresent()
    expect(componentNotFetching.find(Loader)).not.toBePresent()
  })
})
