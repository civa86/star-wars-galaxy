import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import './App.css'

import { ModuleLoader } from '../../components/Loader'
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

//TODO: move in a layout file....

const FullContent = () => (
  <div className="row">
    <div className="col-xs-12">
      <main>
        <Home />
      </main>
    </div>
  </div>
)

const SplitContent = props => (
  <div className="row">
    <div className="col-sm-2">
      <Navigation resources={props.resources} homeLink fetchingItems={props.fetchingItems} />
    </div>
    <div className="col-sm-10">
      <List />
    </div>
  </div>
)

class App extends Component {
  componentDidMount() {
    const { getResources } = this.props
    getResources()
  }

  render() {
    return (
      <div className="App container-fluid">
        <Switch>
          <Route exact path="/" render={() => <FullContent {...this.props} />} />
          <Route exact path="/:resource" render={() => <SplitContent {...this.props} />} />
          <Route component={NotFound} />
        </Switch>
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
