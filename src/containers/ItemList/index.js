import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withSidebar from '../../components/withSidebar'
import ItemPreview from '../../components/ItemPreview'
import { getItems, getSchema } from '../../reducers/swapi'

class ItemList extends Component {
  // Component Methods
  getResource() {
    const { match } = this.props
    return match.params ? match.params.resource : null
  }

  loadData(resource, page) {
    const { schemas, items, getItems, getSchema } = this.props
    getItems(resource, items, page)
    getSchema(resource, schemas)
  }

  laodNextItems(event, nextItemsUrl) {
    event.preventDefault()
    const nextPage = Number(nextItemsUrl.match(/page=(\d)/)[1])
    if (nextPage > 0) {
      this.loadData(this.getResource(), nextPage)
    }
  }

  // Component Lifecycle
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

  // Component Rendering
  render() {
    const { items, schemas } = this.props
    const resource = this.getResource()
    const itemsList = items[resource] && items[resource].results ? items[resource].results : []
    const nextItemsUrl = items[resource] && items[resource].next ? items[resource].next : null
    return (
      <div className="item-list">
        <h1>{resource}</h1>
        <section>
          <ul className="row">
            {itemsList.map((item, i) => (
              <li key={i} className="col-xs-12 col-sm-6 col-md-4">
                {item && schemas[resource] && <ItemPreview item={item} schema={schemas[resource]} />}
              </li>
            ))}
          </ul>
          {nextItemsUrl && (
            <div>
              <button className="btn btn-default" onClick={event => this.laodNextItems(event, nextItemsUrl)}>
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sidebarItems: state.swapi.resources,
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

export default connect(mapStateToProps, mapDispatchToProps)(withSidebar(ItemList))
