import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Switch from 'react-switch'
import Navigation from '../../components/Navigation'
import StarWarsIcon from '../../components/StarWarsIcon'
import { setForceSide } from '../../reducers/force'

class Home extends Component {
  changeForceSide() {
    const { force, setForceSide } = this.props
    const changeSide = force.side === 'light' ? 'dark' : 'light'
    setForceSide(changeSide)
  }
  render() {
    const { force, resources } = this.props

    return (
      <div className="home">
        <header>
          <div className="row">
            <div className="logo col-xs-12 col-sm-4 col-lg-3">
              <h1>
                <StarWarsIcon icon="swg-starwars" />
                <span className="sr-only">Star Wars Logo</span>
              </h1>
            </div>
            <div className="links col-xs-12 col-sm-8 col-lg-9">
              <ul>
                <li className="swapi">
                  powered by{' '}
                  <a href="https://swapi.co/" target="_blank" rel="noopener noreferrer">
                    SWAPI
                  </a>
                </li>
                <li className="github">
                  <a href="https://github.com">
                    <StarWarsIcon icon="swg-github" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>
              </ul>
              <label className="pull-right" htmlFor="force-side-switch">
                <span className="sr-only">Switch to change Force Side</span>
                <Switch
                  checked={force.side && force.side === 'dark'}
                  onChange={() => this.changeForceSide()}
                  uncheckedIcon={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: 35,
                        paddingTop: 5,
                        color: '#bd4422'
                      }}>
                      <StarWarsIcon icon="swg-galrep" />
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: 35,
                        paddingTop: 5,
                        color: '#018acc'
                      }}>
                      <StarWarsIcon icon="swg-reball" />
                    </div>
                  }
                  offColor="#1a1112"
                  onColor="#bba79c"
                  offHandleColor="#70787D"
                  onHandleColor="#41363A"
                  handleDiameter={30}
                  height={40}
                  width={90}
                  className="react-switch"
                  id="force-side-switch"
                />
              </label>
            </div>
          </div>
        </header>
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
