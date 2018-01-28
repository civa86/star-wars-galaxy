const asc = (a, b) => (a < b ? -1 : b < a ? 1 : 0)

const doSortingByDirection = (a, b, direction) => {
  if (direction === 'desc') {
    return -1 * asc(a, b)
  } else {
    return asc(a, b)
  }
}

export const sortObjectCollectionByProp = (collection, prop, direction = 'asc') => [
  ...collection.sort((a, b) => doSortingByDirection(a[prop], b[prop], direction))
]
