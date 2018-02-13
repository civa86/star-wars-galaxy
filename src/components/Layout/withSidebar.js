import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Loader from '../Loader'
import ResourceIcon from '../Icon/ResourceIcon'
import ExternalLinks from '../ExternalLinks'

const withSidebar = WrappedComponent => {
  class withSidebarHOC extends Component {
    render() {
      const isFetchingResources = this.props.isFetchingResources || false
      const items = this.props.sidebarItems || []
      const isActive = this.props.sidebarIsActive || false

      return (
        <div className={'sidebar-layout-wrapper' + (isActive ? ' active' : '')}>
          <div className={'sidebar' + (isActive ? ' active' : '')}>
            {isFetchingResources && <Loader />}
            {!isFetchingResources && (
              <div className="container-fluid">
                <ul className="list-unstyled row">
                  {items.map((item, i) => (
                    <li key={i} className="col-xs-12">
                      <NavLink to={'/' + item.name}>
                        <div className="item">
                          <ResourceIcon resource={item.name} />
                          <span className="name">{item.name}</span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
                {items.length !== 0 && <ExternalLinks />}
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
    sidebarIsActive: PropTypes.bool
  }

  return withSidebarHOC
}

export default withSidebar
