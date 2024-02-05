export enum Actions {
  SET_STORAGE = 'SET_STORAGE',
  ADD_STORAGE_ITEM = 'ADD_STORAGE_ITEM',
  REMOVE_STORAGE_ITEM = 'REMOVE_STORAGE_ITEM',
  UPDATE_STORAGE_ITEM = 'UPDATE_STORAGE_ITEM',
}

export type Context = {
  state: State
  dispatch: React.Dispatch<unknown>
}

export type State = {
  storage: StorageItem[]
}

export type StateComponentProps = {
  children: JSX.Element
}

export type StorageItem = {
  id: string
  name: string
  quantity: number
  form: string
  icon: string
  collection: string
}

export type SetStorageAction = {
  type: Actions.SET_STORAGE
  payload: StorageItem[]
}

export type AddStorageItemAction = {
  type: Actions.ADD_STORAGE_ITEM
  payload: StorageItem
}

export type RemoveStorageItemAction = {
  type: Actions.REMOVE_STORAGE_ITEM
  payload: string
}

export type UpdateStorageItemAction = {
  type: Actions.UPDATE_STORAGE_ITEM
  payload: StorageItem
}

export type Action =
  | SetStorageAction
  | AddStorageItemAction
  | RemoveStorageItemAction
  | UpdateStorageItemAction
