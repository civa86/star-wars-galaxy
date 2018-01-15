import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Home.css'

import { ModuleLoader } from '../../components/Loader'
import { NavigationItem } from '../../components/Navigation'
import StarWarsIcon from '../../components/StarWarsIcon'

class Home extends Component {
  render() {
    const { resources, isFetching } = this.props

    return (
      <div className="Home">
        {isFetching && <ModuleLoader />}
        {!isFetching && (
          <div>
            <h1 className="Home-Logo">
              <span className="sr-only">STAR WARS</span>
              <StarWarsIcon icon="swg-starwars" />
            </h1>
            <nav>
              <ul className="row">
                {resources.map((e, i) => (
                  <li key={i} className="col-xs-6 col-sm-4">
                    <NavigationItem key={'nav-item' + i} resource={e} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.swapi.isFetching,
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
