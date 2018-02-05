import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Counter from './Counter'

describe('Counter Component', () => {
  it('renders without crashing', () => {
    shallow(<Counter item={{}} />)
  })
  it('has default values', () => {
    const component = shallow(<Counter item={{}} />)
    expect(component).toContainReact(<div className="items-counter">0/0</div>)
  })
  it('shows counter based on item prop', () => {
    const item = { count: 90, results: Array(5) }
    const component = shallow(<Counter item={item} />)
    expect(component).toContainReact(<div className="items-counter">5/90</div>)
  })
})
