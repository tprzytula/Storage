jest.mock('../api')

import { screen, render } from '@testing-library/react'
import StorageAddItem from './StorageAddItem'
import { AppState, initialState } from '../state'

const renderStorageAddItemView = () => {
  render(
    <AppState.Provider
      value={{ state: { ...initialState }, dispatch: jest.fn() }}
    >
      <StorageAddItem />
    </AppState.Provider>
  )
}

describe('Given the StorageItems component', () => {
  it('should render the name field', () => {
    renderStorageAddItemView()

    expect(screen.getByLabelText('Name *')).toBeVisible()
  })

  it('should render the quantity field', () => {
    renderStorageAddItemView()

    expect(screen.getByLabelText('Quantity *')).toBeVisible()
  })

  it('should render the form field', () => {
    renderStorageAddItemView()

    expect(screen.getByLabelText('Form *')).toBeVisible()
  })

  it('should render the add button', () => {
    renderStorageAddItemView()

    expect(screen.getByLabelText('Add Button')).toBeVisible()
  })

  it('should render the back button', () => {
    renderStorageAddItemView()

    expect(screen.getByLabelText('Back Button')).toBeVisible()
  })
})
