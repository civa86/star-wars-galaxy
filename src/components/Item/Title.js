import React from 'react'
import PropTypes from 'prop-types'

const ItemTitle = props => {
  const { item, schema } = props
  const key = schema && schema.required && schema.required.length > 0 ? schema.required[0] : null
  return key && item[key] ? <span>{item[key]}</span> : ''
}

ItemTitle.propTypes = {
  item: PropTypes.object.isRequired,
  schema: PropTypes.object
}

export default ItemTitle
