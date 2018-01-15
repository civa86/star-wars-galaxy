import React, { Component } from 'react'

import './NotFound.css'

import Error from '../../components/Error'

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Error message="Page not found" />
      </div>
    )
  }
}

export default NotFound
