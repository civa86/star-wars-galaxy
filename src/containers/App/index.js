import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from '../../components/Loader'
import ThemeColor from '../../components/Layout/ThemeColor'
import Error from '../Error'
import { getResources } from '../../reducers/swapi'

const FixedLoader = () => (
  <div className="fixed-loader">
    <Loader />
  </div>
)

// Async Components Loading
const Home = Loadable({
  loader: () => import('../Home'),
  loading: () => <FixedLoader />
})

const ItemList = Loadable({
  loader: () => import('../ItemList'),
  loading: () => <FixedLoader />
})

const ItemDetail = Loadable({
  loader: () => import('../ItemDetail'),
  loading: () => <FixedLoader />
})

const NotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: () => <FixedLoader />
})

class App extends Component {
  // Component Lifecycle
  componentWillMount() {
    const { getResources } = this.props
    getResources()
  }

  // Component Rendering
  render() {
    const { force } = this.props
    return (
      <ThemeColor color={force.side}>
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
          {/* {fetchingItems > 0 && (
            <div className="fixed-loader">
              <Loader />
            </div>
          )} */}
        </div>
      </ThemeColor>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  force: state.force,
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
