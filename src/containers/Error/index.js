import React, { Component } from 'react'

import './Error.css'

import ErrorMessage from '../../components/ErrorMessage'

class NotFound extends Component {
  render() {
    return (
      <div className="Error">
        <ErrorMessage message="Something went wrong :( " />
      </div>
    )
  }
}

export default NotFound
