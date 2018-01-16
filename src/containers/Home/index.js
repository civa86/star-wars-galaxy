import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Home.css'

import Navigation from '../../components/Navigation'
import StarWarsIcon from '../../components/StarWarsIcon'

class Home extends Component {
  render() {
    const { resources } = this.props

    return (
      <div className="Home">
        <h1 className="Home-Logo">
          <span className="sr-only">STAR WARS</span>
          <StarWarsIcon icon="swg-starwars" />
        </h1>
        <Navigation resources={resources} column="col-xs-6 col-sm-4" type="Navigation-Card" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchingItems: state.api.fetchingItems,
  resources: state.swapi.resources
})

export default connect(mapStateToProps, null)(Home)
