import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Loader'
import ItemTitle from '../../components/Item/Title'
import { getItem, getSchema } from '../../reducers/swapi'

class ItemLoaderList extends Component {
  getItemParamsFromUrl(url) {
    const urlParts = url
      .split('/')
      .filter(e => e !== '')
      .slice(-2)
    return {
      resource: urlParts[0],
      id: Number(urlParts[1])
    }
  }

  loadList(list) {
    const { items, schemas, getItem, getSchema } = this.props
    list.forEach((e, i) => {
      const itemToLoad = this.getItemParamsFromUrl(e)
      if (i === 0) {
        getSchema(itemToLoad.resource, schemas)
      }
      getItem(itemToLoad.resource, itemToLoad.id, items)
    })
  }

  componentWillMount() {
    const { list } = this.props
    this.loadList(list)
  }

  componentWillReceiveProps(nextProps) {
    const isListMatching = this.props.list.join('') === nextProps.list.join('')
    if (!isListMatching) {
      this.loadList(nextProps.list)
    }
  }

  render() {
    const { list, items, schemas, getItem, getSchema } = this.props
    const loadedItems = list.map(e => {
      const itemToLoad = this.getItemParamsFromUrl(e)
      if (
        items &&
        items[itemToLoad.resource] &&
        items[itemToLoad.resource].results &&
        items[itemToLoad.resource].results.length > 0
      ) {
        const matchedItem = items[itemToLoad.resource].results.filter(i => i.id === itemToLoad.id).pop()
        return matchedItem || null
      }
      return null
    })

    if (loadedItems.every(e => e !== null)) {
      return (
        <ul className="item-loader-list list-unstyled">
          {loadedItems.map(item => (
            <li className="item-loader-list-element" key={item.resource + '-' + item.id}>
              <NavLink to={'/' + item.resource + '/' + item.id}>
                <ItemTitle item={item} schema={schemas[item.resource]} />
              </NavLink>
            </li>
          ))}
        </ul>
      )
    } else {
      return <Loader />
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemLoaderList)
