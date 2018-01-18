import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getItems, getSchema } from '../../reducers/swapi'

class List extends Component {
  loadPageData(resource, schemas) {
    const { getItems, getSchema } = this.props
    getItems(resource)
    getSchema(resource, schemas)
  }

  componentDidMount() {
    const { match, schemas } = this.props
    const resource = match.params ? match.params.resource : null
    this.loadPageData(resource, schemas)
  }

  componentWillReceiveProps(nextProps) {
    const { match, schemas } = this.props
    const resource = match.params ? match.params.resource : null
    const nextResource = nextProps.match.params ? nextProps.match.params.resource : null
    if (resource && nextResource && nextResource !== resource) {
      this.loadPageData(nextResource, schemas)
    }
  }

  render() {
    return (
      <div className="List">
        <h1>RES</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.swapi.items,
  schemas: state.swapi.schemas
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getItems,
      getSchema
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(List)
