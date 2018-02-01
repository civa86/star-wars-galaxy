import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Equalizer from 'react-equalizer'
import withSidebar from '../../components/Layout/withSidebar'
import withFixedHeader from '../../components/Layout/withFixedHeader'
import ItemTitle from '../../components/Item/Title'
import ItemLabel from '../../components/Item/Label'
import { setActiveSidebar } from '../../reducers/sidebar'
import { getItem, getSchema } from '../../reducers/swapi'
import { setForceSide } from '../../reducers/force'
import { isUrl } from '../../reducers/fetchApi'

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
    }
  }

  componentDidMount() {
    document.body.scrollTo(0, 0)
  }

  render() {
    const { schemas } = this.props
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
                    <div key={'props' + i} className="col-xs-12 col-md-6 col-lg-4">
                      <div className="item-property">
                        <div className="item-property-label">
                          <ItemLabel label={e.name} />
                        </div>
                        <div className="item-property-value">{e.value}</div>
                      </div>
                    </div>
                  ))}
                </Equalizer>
              </section>
              <ul className="list-unstyled row">
                {fields.filter(e => e.type === 'array').map((e, i) => (
                  <li className="col-xs-12 col-md-4" key={'obj' + i}>
                    <h2>{e.name}</h2>
                    <ul className="list-unstyled">{e.value.map((url, i) => <li key={'obj-url' + i}>{url}</li>)}</ul>
                  </li>
                ))}
              </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(withFixedHeader(withSidebar(ItemDetail)))
