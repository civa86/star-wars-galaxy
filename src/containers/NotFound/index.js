import React, { Component } from 'react'

import ErrorMessage from '../../components/ErrorMessage'

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
