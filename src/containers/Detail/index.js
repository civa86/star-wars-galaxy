import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getSchema, getItem } from '../../reducers/swapi'

// import ItemPreview from '../../components/ItemPreview'

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
    const { schemas, items, getSchema, getItem } = this.props
    getItem(this.getResource(), this.getId(), items)
    getSchema(resource, schemas)
  }

  componentWillMount() {
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
        {schemas[resource] &&
          schemas[resource].properties && (
            <section>
              {Object.keys(schemas[resource].properties)
                .filter(e => schemas[resource].properties[e].type !== 'array')
                .filter(e => !e.match(/created|edited|url/))
                .map(e => <div>{e}</div>)}
            </section>
          )}
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
      getItem,
      getSchema
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
