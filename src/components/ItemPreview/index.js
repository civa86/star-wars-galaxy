import React from 'react'
import { NavLink } from 'react-router-dom'

const ItemPreview = props => {
  const { item, schema } = props

  const getPrimaryField = () => {
    const key = schema && schema.required && schema.required.length > 0 ? schema.required[0] : null
    return key && item[key] ? item[key] : ''
  }

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
      <h2>{getPrimaryField()}</h2>
      <ul>
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
