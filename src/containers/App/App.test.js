import React from 'react'
import { shallow } from 'enzyme'
import 'jest-enzyme'
import { Switch, Route } from 'react-router-dom'
import { App } from './index'
import Loader from '../../components/Loader'

describe('App Container', () => {
  it('renders without crashing', () => {
    shallow(<App getResources={() => []} force={{ side: '' }} />)
  })
  it('renders Loader if fetchingItems is greater than zero', () => {
    const app = shallow(<App getResources={() => []} force={{ side: '' }} fetchingItems={1} />)
    expect(app).toContainReact(<Loader />)
  })
  it("doesn't render Loader if fetchingItems is equal than zero", () => {
    const app = shallow(<App getResources={() => []} force={{ side: '' }} fetchingItems={0} />)
    expect(app).not.toContainReact(<Loader />)
  })
  it('renders Switch and Route from react router dom', () => {
    const app = shallow(<App getResources={() => []} force={{ side: '' }} />)
    expect(app).toBePresent(<Switch />)
    expect(app).toBePresent(<Route />)
  })
})
