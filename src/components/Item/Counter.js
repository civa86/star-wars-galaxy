import React from 'react'
import PropTypes from 'prop-types'

const ItemCounter = props => {
  const { item } = props
  const current = item && item.results ? item.results.length : 0
  const total = item && item.count ? item.count : 0
  return (
    <div className="items-counter">
      {current}/{total}
    </div>
  )
}

ItemCounter.propTypes = {
  item: PropTypes.object
}

export default ItemCounter
