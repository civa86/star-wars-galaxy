import React, { Component } from 'react'

import ErrorMessage from '../../components/ErrorMessage'

class Error extends Component {
  render() {
    return <ErrorMessage message="Something went wrong :( " />
  }
}

export default Error
