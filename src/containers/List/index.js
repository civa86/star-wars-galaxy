import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getItems, getSchema } from '../../reducers/swapi'

import ItemPreview from '../../components/ItemPreview'

class List extends Component {
  getResource() {
    const { match } = this.props
    return match.params ? match.params.resource : null
  }

  loadData(resource) {
    const { schemas, items, getItems, getSchema } = this.props
    getItems(resource, items)
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
    const { items, schemas } = this.props
    const resource = this.getResource()
    const itemsList = items[resource] && items[resource].results ? items[resource].results : []
    return (
      <div className="List">
        <h1>{resource}</h1>
        <section>
          <ul>
            {itemsList.map((item, i) => (
              <li key={i}>{item && schemas[resource] && <ItemPreview item={item} schema={schemas[resource]} />}</li>
            ))}
          </ul>
        </section>
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
