import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Home.css'

import { ModuleLoader } from '../../components/Loader'
import Navigation from '../../components/Navigation'
import StarWarsIcon from '../../components/StarWarsIcon'

class Home extends Component {
  render() {
    const { resources, fetchingItems } = this.props

    return (
      <div className="Home">
        {fetchingItems > 0 && <ModuleLoader />}
        {fetchingItems === 0 && (
          <div>
            <h1 className="Home-Logo">
              <span className="sr-only">STAR WARS</span>
              <StarWarsIcon icon="swg-starwars" />
            </h1>
            <Navigation
              resources={resources}
              fetchingItems={fetchingItems}
              column="col-xs-6 col-sm-4"
              type="Navigation-Card"
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchingItems: state.api.fetchingItems,
  resources: state.swapi.resources
})

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getResources
//     },
//     dispatch
//   )

export default connect(mapStateToProps, null)(Home)
