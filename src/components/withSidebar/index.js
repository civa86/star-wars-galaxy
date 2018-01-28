import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ResourceIcon from '../ResourceIcon'

const withSidebar = WrappedComponent => {
  return class extends Component {
    render() {
      const items = this.props.sidebarItems || []
      const isActive = this.props.sidebarIsActive || false

      return (
        <div className="sidebar-layout-wrapper">
          <div className={'sidebar' + (isActive ? ' active' : '')}>
            <ul className="list-unstyled row">
              <li>
                <NavLink to={'/'}>
                  <div className="item">
                    <ResourceIcon resource="default" />
                    <span className="sr-only">Home</span>
                  </div>
                </NavLink>
              </li>
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
          </div>
          <div className="content">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
}

export default withSidebar
