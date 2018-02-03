import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import StarWarsIcon from '../../components/Icon/StarWarsIcon'
import ResourceIcon from '../../components/Icon/ResourceIcon'
import ForceSideSwitch from '../../components/ForceSideSwitch'
import { setForceSide } from '../../reducers/force'

export class Home extends Component {
  render() {
    const { force, resources, setForceSide } = this.props

    return (
      <div className="home container-fluid">
        <header>
          <div className="row">
            <div className="logo col-xs-12 col-sm-4 col-lg-3">
              <h1>
                <StarWarsIcon icon="swg-starwars" />
                <span className="sr-only">Star Wars Logo</span>
              </h1>
            </div>
            <div className="links col-xs-12 col-sm-8 col-lg-9">
              <ul className="list-unstyled">
                <li className="swapi">
                  powered by{' '}
                  <a href="https://swapi.co/" target="_blank" rel="noopener noreferrer">
                    SWAPI
                  </a>
                </li>
                <li className="github">
                  <a href="https://github.com/civa86/star-wars-galaxy" target="_blank" rel="noopener noreferrer">
                    <StarWarsIcon icon="swg-github" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>
              </ul>
              <ForceSideSwitch side={force.side} changeForceSide={side => setForceSide(side)} />
            </div>
          </div>
        </header>
        <section className="sub-title">
          <span>
            A long time ago in a galaxy far,<br />
            far away....
          </span>
        </section>
        <section className="resources">
          <ul className="list-unstyled row">
            {resources.map((resource, i) => (
              <li key={i} className="col-xs-12 col-sm-6 col-md-4">
                <NavLink to={'/' + resource.name}>
                  <div className="item">
                    <ResourceIcon resource={resource.name} />
                    <span className="name">{resource.name}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  force: state.force,
  fetchingItems: state.api.fetchingItems,
  resources: state.swapi.resources
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setForceSide
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
