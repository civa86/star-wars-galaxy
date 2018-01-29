import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withSidebar from '../../components/Layout/withSidebar'
import ItemPrimaryField from '../../components/ItemPrimaryField'
import ItemFieldLabel from '../../components/ItemFieldLabel'
import { isUrl } from '../../reducers/Api'
import { getSchema, getItem } from '../../reducers/swapi'

class ItemDetail extends Component {
  getResource() {
    const { match } = this.props
    return match.params ? match.params.resource : null
  }

  getId() {
    const { match } = this.props
    return match.params ? match.params.id : null
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

  render() {
    const { schemas } = this.props
    const resource = this.getResource()
    const item = this.getLoadedItem()
    const fields = this.getItemFields(item)

    return (
      <div>
        {item &&
          schemas[resource] && (
            <div className="Detail">
              <h1>
                <ItemPrimaryField item={item} schema={schemas[resource]} />
              </h1>
              <section>
                <table className="table">
                  <tbody>
                    {fields.filter(e => e.type !== 'array' && !e.name.match(/created|edited|url/)).map((e, i) => (
                      <tr key={'label' + i}>
                        <td>
                          <ItemFieldLabel label={e.name} />
                        </td>
                        <td>
                          {isUrl(e.value) && <span>url....</span>}
                          {!isUrl(e.value) && <span>{e.value}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className="list-unstyled row">
                  {fields.filter(e => e.type === 'array').map((e, i) => (
                    <li className="col-xs-12 col-md-4" key={'obj' + i}>
                      <h2>{e.name}</h2>
                      <ul className="list-unstyled">{e.value.map((url, i) => <li key={'obj-url' + i}>{url}</li>)}</ul>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withSidebar(ItemDetail))
