import React, { Component } from 'react'

import ErrorMessage from '../../components/ErrorMessage'

class NotFound extends Component {
  render() {
    return <ErrorMessage message="Page not found" />
  }
}

export default NotFound
