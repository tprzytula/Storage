jest.mock('../../api')

import { waitFor, screen, render } from '@testing-library/react'
import StorageItem from './Item'
import { AppState, initialState } from '../../state'
import { deleteItem, updateItem } from '../../api'

const exampleStorageItemProps = {
  id: '1',
  name: 'Toilet Paper',
  icon: 'water',
  quantity: 5,
  form: 'rolls',
  collection: 'storage',
}

const renderStorageItem = (props = {}) => {
  const dispatchSpy = jest.fn()
  const combinedProps = { ...exampleStorageItemProps, ...props }

  render(
    <AppState.Provider value={{ state: initialState, dispatch: dispatchSpy }}>
      <StorageItem {...combinedProps} />
    </AppState.Provider>
  )

  return { dispatchSpy }
}

const wait = (time = 0) => new Promise((resolve) => setTimeout(resolve, time))
const updateItemMock = updateItem as jest.Mock

describe('Given the StorageItem component', () => {
  beforeEach(() => {
    updateItemMock.mockResolvedValue(exampleStorageItemProps)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the name', () => {
    renderStorageItem()

    expect(screen.getByLabelText('Item Name')).toHaveTextContent('Toilet Paper')
  })

  it('should render the quantity', () => {
    renderStorageItem()

    expect(screen.getByLabelText('Item Quantity')).toHaveTextContent('5')
  })

  it('should render the type', () => {
    renderStorageItem()

    expect(screen.getByLabelText('Item Form')).toHaveTextContent('rolls')
  })

  it('should render the delete button', () => {
    renderStorageItem()

    expect(screen.getByLabelText('Delete')).toBeVisible()
  })

  it('should render the item image', () => {
    renderStorageItem()

    expect(screen.getByAltText('Toilet Paper Image')).toBeVisible()
  })

  describe('When user clicks on the delete button', () => {
    it('should fire a request to remove the item', () => {
      renderStorageItem()

      screen.getByLabelText('Delete').click()

      expect(deleteItem).toHaveBeenCalledWith('1', 'storage')
    })

    describe('And the request was successful', () => {
      it('should fire a dispatch to update the state', async () => {
        const deleteItemMock = deleteItem as jest.Mock
        deleteItemMock.mockResolvedValue({})

        const { dispatchSpy } = renderStorageItem()

        screen.getByLabelText('Delete').click()

        await waitFor(() =>
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'REMOVE_STORAGE_ITEM',
            payload: '1',
          })
        )
      })
    })

    describe('And the request was unsuccessful', () => {
      it('should fire a dispatch to update the state', async () => {
        const { dispatchSpy } = renderStorageItem()

        screen.getByLabelText('Delete').click()

        await wait()

        expect(dispatchSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('When user increases the quantity of an item', () => {
    it('should fire a request to update the item', () => {
      renderStorageItem()

      screen.getByLabelText('Increase Quantity').click()

      expect(updateItem).toHaveBeenCalledWith(
        {
          id: '1',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 6,
          form: 'rolls',
        },
        'storage'
      )
    })

    describe('And the request was successful', () => {
      it('should fire a dispatch to update the state', async () => {
        const { dispatchSpy } = renderStorageItem()

        screen.getByLabelText('Increase Quantity').click()

        await waitFor(() =>
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'UPDATE_STORAGE_ITEM',
            payload: {
              id: '1',
              name: 'Toilet Paper',
              icon: 'water',
              quantity: 5,
              form: 'rolls',
              collection: 'storage',
            },
          })
        )
      })
    })

    describe('And the request was unsuccessful', () => {
      it('should NOT fire a dispatch to update the state', async () => {
        updateItemMock.mockResolvedValue(false)

        const { dispatchSpy } = renderStorageItem()

        screen.getByLabelText('Increase Quantity').click()

        await wait()

        expect(dispatchSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('When user decreases the quantity of an item', () => {
    it('should fire a request to update the item', () => {
      renderStorageItem()

      screen.getByLabelText('Decrease Quantity').click()

      expect(updateItem).toHaveBeenCalledWith(
        {
          id: '1',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 4,
          form: 'rolls',
        },
        'storage'
      )
    })

    describe('And the quantity is 0', () => {
      it('should fire a dispatch to update the state', async () => {
        const { dispatchSpy } = renderStorageItem({
          id: '1',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 0,
          form: 'rolls',
        })

        screen.getByLabelText('Decrease Quantity').click()

        await wait()

        expect(dispatchSpy).not.toHaveBeenCalled()
      })
    })

    describe('And the request was successful', () => {
      it('should fire a dispatch to update the state', async () => {
        const { dispatchSpy } = renderStorageItem()

        screen.getByLabelText('Decrease Quantity').click()

        await waitFor(() =>
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'UPDATE_STORAGE_ITEM',
            payload: exampleStorageItemProps,
          })
        )
      })
    })

    describe('And the request was unsuccessful', () => {
      it('should NOT fire a dispatch to update the state', async () => {
        updateItemMock.mockResolvedValue(false)

        const { dispatchSpy } = renderStorageItem()

        screen.getByLabelText('Decrease Quantity').click()

        await wait()

        expect(dispatchSpy).not.toHaveBeenCalled()
      })
    })
  })
})
