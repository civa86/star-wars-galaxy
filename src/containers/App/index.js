import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import './App.css'

import { ModuleLoader } from '../../components/Loader'
import { FullContent, SplitContent } from '../../components/Layout'
import Navigation from '../../components/Navigation'

import { getResources } from '../../reducers/swapi'

const Home = Loadable({
  loader: () => import('../Home'),
  loading: () => <ModuleLoader />
})

const List = Loadable({
  loader: () => import('../List'),
  loading: () => <ModuleLoader />
})

const NotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: () => <ModuleLoader />
})

class App extends Component {
  componentDidMount() {
    const { getResources } = this.props
    getResources()
  }

  render() {
    const { resources, fetchingItems } = this.props
    return (
      <div className="App container-fluid">
        {fetchingItems > 0 && <ModuleLoader />}
        {fetchingItems === 0 && (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <FullContent>
                  <Home />
                </FullContent>
              )}
            />
            <Route
              exact
              path="/:resource"
              render={() => (
                <SplitContent navigation={<Navigation resources={resources} homeLink />}>
                  <List />
                </SplitContent>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchingItems: state.api.fetchingItems,
  resources: state.swapi.resources
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getResources
    },
    dispatch
  )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
