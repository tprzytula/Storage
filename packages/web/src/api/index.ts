import { StorageItem } from '../state/types'

const API_BASE_URL = 'https://4047ilhsk4.execute-api.eu-west-2.amazonaws.com/v1'

export const retrieveItems = async (collection: string) => {
  const response = await fetch(
    `${API_BASE_URL}/collections/${collection}/items`
  )

  if (response.ok) {
    return await response.json()
  }
}

type AddItemParam = Omit<StorageItem, 'id' | 'collection'>

export const addItem = async (item: AddItemParam, collection: string) => {
  const response = await fetch(
    `${API_BASE_URL}/collections/${collection}/items`,
    {
      method: 'PUT',
      body: JSON.stringify(item),
    }
  )

  if (response.ok) {
    return await response.json()
  }
}

export const deleteItem = async (id: string, collection: string) => {
  const response = await fetch(
    `${API_BASE_URL}/collections/${collection}/items/${id}`,
    {
      method: 'DELETE',
    }
  )
  await response.text()

  return !!response.ok
}

export const updateItem = async (
  item: Omit<StorageItem, 'collection'>,
  collection: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/collections/${collection}/items/${item.id}`,
    {
      method: 'POST',
      body: JSON.stringify(item),
    }
  )

  if (response.ok) {
    return await response.json()
  }
}
