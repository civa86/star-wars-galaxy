import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import StarWarsIcon from '../StarWarsIcon'
import ForceSideSwitch from '../ForceSideSwitch'

const onWindowScroll = () => {
  const content = document.querySelector('.fixed-header-content')
  const header = document.querySelector('.fixed-header')
  if (content.getBoundingClientRect().y - content.offsetTop < 0) {
    header.classList.add('shadow')
  } else {
    header.classList.remove('shadow')
  }
}

const withFixedHeader = WrappedComponent => {
  return class extends Component {
    toggleSidebar(event) {
      const { setActiveSidebar, sidebarIsActive } = this.props
      event.preventDefault()
      setActiveSidebar(!sidebarIsActive)
    }

    componentDidMount() {
      document.body.addEventListener('scroll', onWindowScroll)
    }

    componentWillUnmount() {
      document.body.removeEventListener('scroll', onWindowScroll)
    }

    render() {
      const { setForceSide, force } = this.props
      return (
        <div>
          <header className="fixed-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-4">
                  <div className="toggleSidebar">
                    <a href="" onClick={event => this.toggleSidebar(event)}>
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="sr-only">Toggle navigation</span>
                    </a>
                  </div>
                </div>
                <div>
                  <div className="col-xs-4 home-link">
                    <div className="hidden-xs">
                      <NavLink to="/">
                        <StarWarsIcon icon="swg-starwars" />
                        <span className="sr-only">Home</span>
                      </NavLink>
                    </div>
                  </div>
                  <div className="col-xs-4">
                    <ForceSideSwitch side={force.side} changeForceSide={side => setForceSide(side)} />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="fixed-header-content">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
}

export default withFixedHeader