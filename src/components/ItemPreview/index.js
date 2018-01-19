import React from 'react'

const ItemPreview = props => {
  const { item, schema } = props

  const getPrimaryField = () => {
    const key = schema && schema.required && schema.required.length > 0 ? schema.required[0] : null
    return key && item[key] ? item[key] : ''
  }

  return (
    <div>
      <h2>{getPrimaryField()}</h2>
    </div>
  )
}

export default ItemPreview
