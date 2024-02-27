import { retrieveItems, addItem, deleteItem, updateItem } from '.'
import { FetchMock } from 'jest-fetch-mock'

const fetchMock = fetch as FetchMock
const exampleResponse = [
  {
    id: '1',
    name: 'Toilet Paper',
    icon: 'water',
    quantity: 5,
    form: 'rolls',
  },
  {
    id: '2',
    name: 'Paper Towel',
    icon: 'water',
    quantity: 2,
    form: 'rolls',
  },
]

describe('Given the retrieveItems function', () => {
  it('should make the correct request to the API', async () => {
    fetchMock.mockResponse(JSON.stringify(exampleResponse))

    await retrieveItems('storage')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://haazapce58.execute-api.eu-west-2.amazonaws.com/v1/collections/storage/items'
    )
  })

  it('should return the items on success', async () => {
    fetchMock.mockResponse(JSON.stringify(exampleResponse))

    const result = await retrieveItems('storage')

    expect(result).toStrictEqual(exampleResponse)
  })
})

describe('Given the addItem function', () => {
  const exampleItem = {
    name: 'Toilet Paper',
    icon: 'water',
    quantity: 5,
    form: 'rolls',
  }

  it('should make the correct request to the API', async () => {
    fetchMock.mockResponse(JSON.stringify(exampleItem))

    await addItem(exampleItem, 'storage')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://haazapce58.execute-api.eu-west-2.amazonaws.com/v1/collections/storage/items',
      {
        method: 'PUT',
        body: JSON.stringify(exampleItem),
      }
    )
  })

  it('should return the added item', async () => {
    fetchMock.mockResponse(JSON.stringify(exampleItem))

    const result = await addItem(exampleItem, 'storage')

    expect(result).toStrictEqual(exampleItem)
  })
})

describe('Given the deleteItem function', () => {
  it('should make the correct request to the API', async () => {
    await deleteItem('1', 'storage')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://haazapce58.execute-api.eu-west-2.amazonaws.com/v1/collections/storage/items/1',
      {
        method: 'DELETE',
      }
    )
  })

  it('should return true on success', async () => {
    const result = await deleteItem('1', 'storage')

    expect(result).toBe(true)
  })
})

describe('Given the updateItem function', () => {
  const exampleItem = {
    id: '2',
    name: 'Toilet Paper',
    icon: 'water',
    quantity: 6,
    form: 'rolls',
  }

  it('should make the correct request to the API', async () => {
    fetchMock.mockResponse(JSON.stringify(exampleItem))

    await updateItem(exampleItem, 'storage')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://haazapce58.execute-api.eu-west-2.amazonaws.com/v1/collections/storage/items/2',
      {
        method: 'POST',
        body: JSON.stringify(exampleItem),
      }
    )
  })

  it('should return the updated item', async () => {
    fetchMock.mockResponse(JSON.stringify(exampleItem))

    const result = await updateItem(exampleItem, 'storage')

    expect(result).toStrictEqual(exampleItem)
  })
})
