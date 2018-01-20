import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getSchema } from '../../reducers/swapi'

import ItemPreview from '../../components/ItemPreview'

class Detail extends Component {
  getResource() {
    const { match } = this.props
    return match.params ? match.params.resource : null
  }

  getId() {
    const { match } = this.props
    return match.params ? match.params.id : null
  }

  loadData(resource) {
    const { schemas, getSchema } = this.props
    // getItems(resource, items)
    getSchema(resource, schemas)
  }

  componentDidMount() {
    this.loadData(this.getResource())
  }

  componentWillReceiveProps(nextProps) {
    const resource = this.getResource()
    const nextResource = nextProps.match.params ? nextProps.match.params.resource : null
    if (resource && nextResource && nextResource !== resource) {
      this.loadData(nextResource)
    }
  }

  render() {
    const { schemas } = this.props
    const resource = this.getResource()
    const id = this.getId()
    return (
      <div className="Detail">
        <h1>
          {resource} {id}
        </h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  schemas: state.swapi.schemas
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSchema
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
