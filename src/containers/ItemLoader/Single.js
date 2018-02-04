import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Loader'
import ItemTitle from '../../components/Item/Title'
import { getItem, getSchema } from '../../reducers/swapi'

class ItemLoaderSingle extends Component {
  getItemParamsFromUrl(overrideUrl) {
    const urlToSplit = overrideUrl ? overrideUrl : this.props.url
    const urlParts = urlToSplit
      .split('/')
      .filter(e => e !== '')
      .slice(-2)
    return {
      resource: urlParts[0],
      id: Number(urlParts[1])
    }
  }

  getLoadedItem(resource, id) {
    const { items } = this.props
    return items && items[resource] && items[resource].results
      ? items[resource].results.filter(e => e.id === id).pop()
      : null
  }

  getLoadedSchema(resource) {
    const { schemas } = this.props
    return schemas && schemas[resource] ? schemas[resource] : null
  }

  loadData(overrideUrl) {
    const { items, schemas, getItem, getSchema } = this.props
    const itemToLoad = this.getItemParamsFromUrl(overrideUrl)
    getItem(itemToLoad.resource, itemToLoad.id, items)
    getSchema(itemToLoad.resource, schemas)
  }
  componentWillMount() {
    this.loadData()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.loadData(nextProps.url)
    }
  }

  render() {
    const itemToLoad = this.getItemParamsFromUrl()
    const schema = this.getLoadedSchema(itemToLoad.resource)
    const item = this.getLoadedItem(itemToLoad.resource, itemToLoad.id)

    if (item) {
      return (
        <NavLink to={'/' + itemToLoad.resource + '/' + itemToLoad.id}>
          <ItemTitle item={item} schema={schema} />
        </NavLink>
      )
    } else {
      return (
        <div>
          <Loader />
        </div>
      )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemLoaderSingle)
