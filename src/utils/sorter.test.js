import { sortObjectCollectionByProp } from './sorter'

describe('sorter utility', () => {
  it('sorts collections of object by a property', () => {
    const collection1 = [{ id: 3 }, { id: 1 }, { id: 10 }]
    const collection2 = [{ id: 3, name: 'b' }, { id: 1, name: 'r' }, { id: 10, name: 'a' }]
    const sorted1 = sortObjectCollectionByProp(collection1, 'id')
    const sorted2 = sortObjectCollectionByProp(collection2, 'name')
    const sorted2Desc = sortObjectCollectionByProp(collection2, 'name', 'desc')

    expect(sorted1[0].id).toBe(1)
    expect(sorted1[sorted1.length - 1].id).toBe(10)

    expect(sorted2[0].name).toBe('a')
    expect(sorted2[0].id).toBe(10)
    expect(sorted2[sorted1.length - 1].name).toBe('r')
    expect(sorted2[sorted1.length - 1].id).toBe(1)

    expect(sorted2Desc[0].name).toBe('r')
    expect(sorted2Desc[0].id).toBe(1)
    expect(sorted2Desc[sorted1.length - 1].name).toBe('a')
    expect(sorted2Desc[sorted1.length - 1].id).toBe(10)
  })
})
