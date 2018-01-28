import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ResourceIcon from '../ResourceIcon'

const withSidebar = WrappedComponent => {
  // ...and returns another component...
  return class extends Component {
    render() {
      const items = this.props.sidebarItems || []
      return (
        <div className="row">
          <div className="col-xs-2">
            <ul className="row">
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
          <div className="col-xs-10">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
}

export default withSidebar
