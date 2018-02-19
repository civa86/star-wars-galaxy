import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import ResourceIcon from './ResourceIcon'
import StarWarsIcon from './StarWarsIcon'

describe('ResourceIcon Component', () => {
  it('renders without crashing', () => {
    shallow(<ResourceIcon resource="" forceSide="light" />)
  })
  it('renders the StarWarsIcon matching the resource prop', () => {
    const starshipsIcon = shallow(<ResourceIcon resource="starships" forceSide="light" />)
    const peopleIcon = shallow(<ResourceIcon resource="people" forceSide="light" />)
    expect(starshipsIcon).toContainReact(<StarWarsIcon icon="swg-falcon" />)
    expect(peopleIcon).toContainReact(<StarWarsIcon icon="swg-leia" />)
  })
  it('renders the StarWarsIcon with default value if the resource is not passed', () => {
    const defaultIcon = shallow(<ResourceIcon forceSide="light" />)
    expect(defaultIcon).toContainReact(<StarWarsIcon icon="swg-starwars" />)
  })
  it("renders the StarWarsIcon with default value if the resource prop doesn't match any mapping", () => {
    const defaultIcon = shallow(<ResourceIcon resource="not_match" forceSide="light" />)
    expect(defaultIcon).toContainReact(<StarWarsIcon icon="swg-starwars" />)
  })
  it('renders the StarWarsIcon depending on forceSide', () => {
    const peopleLightIcon = shallow(<ResourceIcon resource="people" forceSide="light" />)
    const peopleDarkIcon = shallow(<ResourceIcon resource="people" forceSide="dark" />)
    expect(peopleLightIcon).toContainReact(<StarWarsIcon icon="swg-leia" />)
    expect(peopleDarkIcon).toContainReact(<StarWarsIcon icon="swg-darthvader-5" />)
  })
  it('has light as default forceSide', () => {
    const peopleLightIcon = shallow(<ResourceIcon resource="people" />)
    expect(peopleLightIcon).toContainReact(<StarWarsIcon icon="swg-leia" />)
  })
})
