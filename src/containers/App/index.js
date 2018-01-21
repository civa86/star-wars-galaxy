import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import './App.css'

import { MainLoader } from '../../components/Loader'
import { FullContent, SplitContent } from '../../components/Layout'
import Navigation from '../../components/Navigation'

import { getResources } from '../../reducers/swapi'

import Error from '../Error'

const Home = Loadable({
  loader: () => import('../Home'),
  loading: () => <MainLoader />
})

const List = Loadable({
  loader: () => import('../List'),
  loading: () => <MainLoader />
})

const Detail = Loadable({
  loader: () => import('../Detail'),
  loading: () => <MainLoader />
})

const NotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: () => <MainLoader />
})

export class App extends Component {
  componentWillMount() {
    const { getResources } = this.props
    getResources()
  }

  render() {
    const { resources, fetchingItems } = this.props
    return (
      <div className="App container-fluid">
        <div>
          <Switch>
            <Route exact path="/error" component={Error} />
            <Route exact path="/404" component={NotFound} />
            <Route
              exact
              path="/"
              render={props => (
                <FullContent>
                  <Home {...props} />
                </FullContent>
              )}
            />
            <Route
              exact
              path="/:resource"
              render={props => (
                <SplitContent navigation={<Navigation resources={resources} homeLink />}>
                  <List {...props} />
                </SplitContent>
              )}
            />
            <Route
              exact
              path="/:resource/:id"
              render={props => (
                <SplitContent navigation={<Navigation resources={resources} homeLink />}>
                  <Detail {...props} />
                </SplitContent>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>

        {fetchingItems > 0 && <MainLoader />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
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
