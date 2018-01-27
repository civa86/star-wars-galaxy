import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import Loader from '../../components/Loader'
import { FullContent, SplitContent } from '../../components/Layout'
import Navigation from '../../components/Navigation'

import { getResources } from '../../reducers/swapi'

import Error from '../Error'

const Home = Loadable({
  loader: () => import('../Home'),
  loading: () => <Loader />
})

const ItemList = Loadable({
  loader: () => import('../ItemList'),
  loading: () => <Loader />
})

const ItemDetail = Loadable({
  loader: () => import('../ItemDetail'),
  loading: () => <Loader />
})

const NotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: () => <Loader />
})

export class App extends Component {
  componentWillMount() {
    const { getResources } = this.props
    getResources()
  }

  render() {
    const { resources, force, fetchingItems } = this.props
    return (
      <div className={force.side}>
        <div className="app">
          <div className="container-fluid">
            <Switch>
              {/* Home route */}
              <Route exact path="/" component={Home} />

              {/* Errors routes */}
              <Route exact path="/error" component={Error} />
              <Route exact path="/404" component={NotFound} />

              {/* Resource and Items routes */}

              {/* <Route
              exact
              path="/:resource"
              render={props => (
                <SplitContent navigation={<Navigation resources={resources} homeLink />}>
                  <ItemList {...props} />
                </SplitContent>
              )}
            />
            <Route
              exact
              path="/:resource/:id"
              render={props => (
                <SplitContent navigation={<Navigation resources={resources} homeLink />}>
                  <ItemDetail {...props} />
                </SplitContent>
              )}
            /> */}
              <Route component={NotFound} />
            </Switch>
          </div>
          {fetchingItems > 0 && <Loader />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  force: state.force,
  fetchingItems: state.api.fetchingItems,
  resources: state.swapi.resources,
  ownProps: ownProps
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getResources
    },
    dispatch
  )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
