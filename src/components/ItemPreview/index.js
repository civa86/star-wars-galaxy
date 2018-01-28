import React from 'react'
import { NavLink } from 'react-router-dom'

import ItemPrimaryField from '../ItemPrimaryField'

const ItemPreview = props => {
  const { item, schema } = props

  const getSecondaryFields = () => {
    const keys = schema.required.slice(1, 5)
    return keys.map(e => (item[e] ? { key: e, value: item[e] } : ''))
  }

  const getUrl = () => {
    const apiDomain = process.env.REACT_APP_API_DOMAIN
    const apiPath = process.env.REACT_APP_API_PATH
    return item.url.replace(apiDomain + apiPath, '').replace(/\/$/, '')
  }

  return (
    <div>
      <h2>
        <ItemPrimaryField item={item} schema={schema} />
      </h2>
      <ul className="list-unstyled">
        {getSecondaryFields().map((e, i) => (
          <li key={i}>
            {e.key}: {e.value}
          </li>
        ))}
      </ul>
      <NavLink exact to={getUrl()}>
        details
      </NavLink>
    </div>
  )
}

export default ItemPreview
