import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import Title from './Title'

describe('Title Component', () => {
  it('renders without crashing', () => {
    shallow(<Title item={{}} />)
  })
  it('renders the first required field of an item', () => {
    const item = { name: 'A A', prop: 'B B' }
    const schema = { required: ['name', 'prop'] }
    const schema2 = { required: ['prop', 'name'] }
    const title1 = shallow(<Title item={item} schema={schema} />)
    const title2 = shallow(<Title item={item} schema={schema2} />)
    expect(title1).toContainReact(<span>A A</span>)
    expect(title2).toContainReact(<span>B B</span>)
  })
})
