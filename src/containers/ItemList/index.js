import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import withSidebar from '../../components/Layout/withSidebar'
import withFixedHeader from '../../components/Layout/withFixedHeader'
import ResourceIcon from '../../components/Icon/ResourceIcon'
import ItemPrimaryField from '../../components/ItemPrimaryField'
import { setActiveSidebar } from '../../reducers/sidebar'
import { getItems, getSchema } from '../../reducers/swapi'
import { setForceSide } from '../../reducers/force'

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
      <div className="item-list container-fluid">
        <h1 className="resource-title">
          <ResourceIcon resource={resource} />
          <span className="name">{resource}</span>
        </h1>
        <section>
          <ul className="list-unstyled row">
            {itemsList.map((item, i) => (
              <li key={i} className="col-xs-12 col-sm-6 col-md-4">
                {item &&
                  schemas[resource] && (
                    <div>
                      <h2>
                        <ItemPrimaryField item={item} schema={schemas[resource]} />
                      </h2>
                      {/* <ul className="list-unstyled">
                        {getSecondaryFields().map((e, i) => (
                          <li key={i}>
                            {e.key}: {e.value}
                          </li>
                        ))}
                      </ul> */}
                      <NavLink exact to={'/' + resource + '/' + item.id}>
                        details
                      </NavLink>
                    </div>
                  )}
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
  sidebarIsActive: state.sidebar.active,
  force: state.force,
  items: state.swapi.items,
  schemas: state.swapi.schemas
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getItems,
      getSchema,
      setForceSide,
      setActiveSidebar
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(withFixedHeader(withSidebar(ItemList)))
