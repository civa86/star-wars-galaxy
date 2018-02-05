import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ResourceIcon from './ResourceIcon'
import StarWarsIcon from './StarWarsIcon'

describe('ResourceIcon Component', () => {
  it('renders without crashing', () => {
    shallow(<ResourceIcon resource="" />)
  })
  it('renders the StarWarsIcon matching the resource prop', () => {
    const starshipsIcon = shallow(<ResourceIcon resource="starships" />)
    const peopleIcon = shallow(<ResourceIcon resource="people" />)
    expect(starshipsIcon).toContainReact(<StarWarsIcon icon="swg-falcon" />)
    expect(peopleIcon).toContainReact(<StarWarsIcon icon="swg-leia" />)
  })
  it("renders the StarWarsIcon with default value if the resource prop doesn't match any mapping", () => {
    const defaultIcon = shallow(<ResourceIcon resource="not_match" />)
    expect(defaultIcon).toContainReact(<StarWarsIcon icon="swg-starwars" />)
  })
})
