import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Loader'
import StarWarsIcon from '../../components/Icon/StarWarsIcon'
import ResourceIcon from '../../components/Icon/ResourceIcon'
import ExternalLinks from '../../components/ExternalLinks'
import ForceSideSwitch from '../../components/ForceSideSwitch'
import { setForceSide } from '../../reducers/force'

class Home extends Component {
  render() {
    const { force, isFetching, resources, setForceSide } = this.props

    return (
      <div className="home container-fluid">
        <header>
          <div className="row">
            <div className="logo col-12 col-sm-4 col-lg-3">
              <h1>
                <StarWarsIcon icon="swg-starwars" />
                <span className="sr-only">Star Wars Logo</span>
              </h1>
            </div>
            <div className="links col-12 col-sm-8 col-lg-9 text-sm-right text-center">
              <ExternalLinks />
              <ForceSideSwitch side={force.side} changeForceSide={side => setForceSide(side)} />
            </div>
          </div>
        </header>
        <section className="sub-title">
          <span>
            A long time ago in a galaxy far,
            <br />
            far away....
          </span>
        </section>
        <section className="resources">
          <ul className="list-unstyled row">
            {resources.map((resource, i) => (
              <li key={i} className="col-12 col-md-6 col-lg-4">
                <NavLink to={'/' + resource.name}>
                  <div className="item">
                    <ResourceIcon resource={resource.name} forceSide={force.side} />
                    <span className="name">{resource.name}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
        {isFetching && (
          <div className="fixed-loader">
            <Loader />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  force: state.force,
  isFetching: state.swapi.fetching.resources,
  resources: state.swapi.resources
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setForceSide
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
