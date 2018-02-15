import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Equalizer from 'react-equalizer'
import withSidebar from '../../components/Layout/withSidebar'
import withFixedHeader from '../../components/Layout/withFixedHeader'
import Loader from '../../components/Loader'
import ResourceIcon from '../../components/Icon/ResourceIcon'
import ItemTitle from '../../components/Item/Title'
import ItemPropertyLabel from '../../components/Item/PropertyLabel'
import ItemPropertyValue from '../../components/Item/PropertyValue'
import ItemCounter from '../../components/Item/Counter'
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

  loadNextItems(event, nextItemsUrl) {
    event.preventDefault()
    const nextPage = Number(nextItemsUrl.match(/page=(\d)/)[1])
    if (nextPage > 0) {
      this.loadData(this.getResource(), nextPage)
    }
  }

  getItemProperties(item, schema) {
    const keys = schema.required.slice(1, 5)
    return keys.map(e => (item[e] ? { key: e, value: item[e] } : ''))
  }

  getEqualizerNodes() {
    return Object.keys(this.refs)
      .filter(e => e.match(/eq\d/))
      .map(e => this.refs[e])
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
      document.body.scrollTo(0, 0)
    }
  }

  // Component Rendering
  render() {
    const { isFetchingPage, isFetchingSchema, isLoadingMore, force, items, schemas } = this.props
    const resource = this.getResource()
    const itemsList = items[resource] && items[resource].results ? items[resource].results : []
    const nextItemsUrl = items[resource] && items[resource].next ? items[resource].next : null
    return (
      <div className="item-list container-fluid">
        <h1 className="resource-title">
          <ResourceIcon resource={resource} forceSide={force.side} />
          <span className="name">{resource}</span>
        </h1>
        {!isFetchingPage &&
          !isFetchingSchema && (
            <section className="item-preview">
              <Equalizer byRow={false} nodes={this.getEqualizerNodes.bind(this)}>
                <ul className="list-unstyled row item-preview-listing">
                  {itemsList.map((item, i) => (
                    <li key={i} className="col-xs-12 col-sm-6 col-lg-4">
                      {schemas[resource] && (
                        <div ref={'eq' + i} className="item-preview-listing-element">
                          <h2>
                            <NavLink exact to={'/' + resource + '/' + item.id}>
                              <ItemTitle item={item} schema={schemas[resource]} />
                            </NavLink>
                          </h2>
                          <ul className="list-unstyled item-property-listing">
                            {this.getItemProperties(item, schemas[resource]).map((e, i) => (
                              <li className="item-property-listing-element" key={i}>
                                <div className="row item-property-row">
                                  <div className="col-xs-12 item-property-label">
                                    <ItemPropertyLabel label={e.key} />
                                  </div>
                                  <div className="col-xs-12 item-property-value">
                                    <ItemPropertyValue value={e.value} />
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="view-more">
                            <NavLink exact to={'/' + resource + '/' + item.id}>
                              more
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Equalizer>
              <ItemCounter item={items[resource]} />
              {nextItemsUrl && (
                <div className="load-more-container">
                  <button className="load-more-btn" onClick={event => this.loadNextItems(event, nextItemsUrl)}>
                    {isLoadingMore && <Loader />}
                    {!isLoadingMore && <span>Load More</span>}
                  </button>
                </div>
              )}
            </section>
          )}
        {(isFetchingPage || isFetchingSchema) && (
          <div className="fixed-loader">
            <Loader />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sidebarItems: state.swapi.resources,
  sidebarIsActive: state.sidebar.active,
  force: state.force,
  isFetchingResources: state.swapi.fetching.resources,
  isFetchingPage: state.swapi.fetching.itemsPage,
  isFetchingSchema: state.swapi.fetching.schema,
  isLoadingMore: state.swapi.fetching.itemsLoadMore,
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
