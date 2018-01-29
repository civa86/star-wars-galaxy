import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from '../../components/Loader'
import Error from '../Error'
import { getResources } from '../../reducers/swapi'

// Async Components Loading
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
  // Component Lifecycle
  componentWillMount() {
    const { getResources } = this.props
    getResources()
  }

  // Component Rendering
  render() {
    const { force, fetchingItems } = this.props
    return (
      <div className={force.side}>
        <div className="app">
          <Switch>
            {/* Home route */}
            <Route exact path="/" component={Home} />

            {/* Errors routes */}
            <Route exact path="/error" component={Error} />
            <Route exact path="/404" component={NotFound} />

            {/* Resource and Items routes */}
            <Route exact path="/:resource" component={ItemList} />
            <Route exact path="/:resource/:id" component={ItemDetail} />

            {/* Not Found catch all route */}
            <Route component={NotFound} />
          </Switch>
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
