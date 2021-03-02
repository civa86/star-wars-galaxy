import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Equalizer from 'react-equalizer'
import ItemLoaderList from '../ItemLoader/List'
import withSidebar from '../../components/Layout/withSidebar'
import withFixedHeader from '../../components/Layout/withFixedHeader'
import Loader from '../../components/Loader'
import ItemTitle from '../../components/Item/Title'
import ItemPropertyLabel from '../../components/Item/PropertyLabel'
import ItemPropertyValue from '../../components/Item/PropertyValue'
import { setActiveSidebar } from '../../reducers/sidebar'
import { getItem, getSchema } from '../../reducers/swapi'
import { setForceSide } from '../../reducers/force'

class ItemDetail extends Component {
  getResource() {
    const { match } = this.props
    return match.params ? match.params.resource : null
  }

  getId() {
    const { match } = this.props
    return match.params ? Number(match.params.id) : null
  }

  getLoadedItem() {
    const { items } = this.props
    const id = this.getId()
    const resource = this.getResource()
    return items && items[resource] && items[resource].results
      ? items[resource].results.filter(e => e.id === id).pop()
      : null
  }

  getItemFields(item) {
    const { schemas } = this.props
    const resource = this.getResource()
    return schemas[resource] && item
      ? schemas[resource].required
          .slice(1, schemas[resource].required.length)
          .map(e => ({ name: e, value: item[e], ...schemas[resource].properties[e] }))
      : []
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
      document.body.scrollTo(0, 0)
    }
  }

  componentDidMount() {
    document.body.scrollTo(0, 0)
  }

  render() {
    const { schemas, isFetchingItem } = this.props
    const resource = this.getResource()
    const item = this.getLoadedItem()
    const fields = this.getItemFields(item)

    return (
      <div>
        {item &&
          schemas[resource] && (
            <div className="item-detail container-fluid">
              <h1>
                <ItemTitle item={item} schema={schemas[resource]} />
              </h1>
              <section className="row">
                <Equalizer nodes={() => document.querySelectorAll('.item-property')}>
                  {fields.filter(e => e.type !== 'array' && !e.name.match(/created|edited|url/)).map((e, i) => (
                    <div key={'props' + i} className="col-12 col-md-6 col-lg-4">
                      <div className="item-property">
                        <div className="item-property-label">
                          <ItemPropertyLabel label={e.name} />
                        </div>
                        <div className="item-property-value">
                          <ItemPropertyValue value={e.value} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {fields.filter(e => e.type === 'array').map((e, i) => {
                    return (
                      e.value.length > 0 && (
                        <div key={'links-resource' + i} className="col-12 col-md-6 col-lg-4">
                          <div className="item-property">
                            <div className="item-property-label">
                              <ItemPropertyLabel label={e.name} />
                            </div>
                            <div className="item-property-value">
                              <ItemLoaderList list={e.value} />
                            </div>
                          </div>
                        </div>
                      )
                    )
                  })}
                </Equalizer>
              </section>
            </div>
          )}
        {isFetchingItem &&
          (!item || !schemas[resource]) && (
            <div className="fixed-loader">
              <Loader />
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetchingResources: state.swapi.fetching.resources,
  isFetchingItem: state.swapi.fetching.singleItem,
  sidebarItems: state.swapi.resources,
  sidebarIsActive: state.sidebar.active,
  force: state.force,
  items: state.swapi.items,
  schemas: state.swapi.schemas
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getItem,
      getSchema,
      setForceSide,
      setActiveSidebar
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFixedHeader(withSidebar(ItemDetail)))
