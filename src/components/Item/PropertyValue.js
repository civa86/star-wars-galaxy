import React from 'react'
import PropTypes from 'prop-types'
import ItemLoaderSingle from '../../containers/ItemLoader/Single'

const ItemPropertyValue = props => {
  const { value } = props
  const isUrl = str => {
    var pattern = new RegExp(
      '^((https?:)?\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locater
    if (!pattern.test(str)) {
      return false
    } else {
      return true
    }
  }
  if (isUrl(value)) {
    return <ItemLoaderSingle url={value} />
  } else {
    return <span>{value}</span>
  }
}

ItemPropertyValue.propTypes = {
  value: PropTypes.string.isRequired
}

export default ItemPropertyValue
