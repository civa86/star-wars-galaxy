import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Loader from '../Loader'
import ResourceIcon from '../Icon/ResourceIcon'
import ExternalLinks from '../ExternalLinks'

const withSidebar = WrappedComponent => {
  class withSidebarHOC extends Component {
    render() {
      const {
        isFetchingResources = false,
        sidebarItems = [],
        sidebarIsActive = false,
        force = { side: 'light' }
      } = this.props

      return (
        <div className={'sidebar-layout-wrapper' + (sidebarIsActive ? ' active' : '')}>
          <div className={'sidebar' + (sidebarIsActive ? ' active' : '')}>
            {isFetchingResources && <Loader />}
            {!isFetchingResources && (
              <div className="container-fluid">
                <ul className="navigation-links list-unstyled row">
                  {sidebarItems.map((item, i) => (
                    <li key={i} className="col-12">
                      <NavLink to={'/' + item.name}>
                        <div className="item">
                          <ResourceIcon resource={item.name} forceSide={force.side} />
                          <span className="name">{item.name}</span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
                {sidebarItems.length !== 0 && <ExternalLinks />}
              </div>
            )}
          </div>
          <div className="content">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }

  withSidebarHOC.propTypes = {
    isFetchingResources: PropTypes.bool,
    sidebarItems: PropTypes.array,
    sidebarIsActive: PropTypes.bool,
    force: PropTypes.object
  }

  return withSidebarHOC
}

export default withSidebar
