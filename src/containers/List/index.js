import React, { Component } from 'react'
import { connect } from 'react-redux'

class List extends Component {
  render() {
    return (
      <div className="Home">
        <h1 className="Home-Logo">RES</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchingItems: state.api.fetchingItems
})

export default connect(mapStateToProps, null)(List)
