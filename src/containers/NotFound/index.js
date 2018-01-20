import React, { Component } from 'react'

import './NotFound.css'

import ErrorMessage from '../../components/Error'

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <ErrorMessage message="Page not found" />
      </div>
    )
  }
}

export default NotFound
