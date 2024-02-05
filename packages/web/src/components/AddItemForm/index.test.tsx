jest.mock('../../api')

import { waitFor, fireEvent, screen, render } from '@testing-library/react'
import AddItemForm from '.'
import { AppState, initialState } from '../../state'
import { addItem } from '../../api'
import { useNavigate } from 'react-router-dom'

const renderStorageAddItemView = () => {
  render(
    <AppState.Provider
      value={{ state: { ...initialState }, dispatch: jest.fn() }}
    >
      <AddItemForm />
    </AppState.Provider>
  )
}

const wait = async (time = 0) =>
  new Promise((resolve) => setTimeout(resolve, time))

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

  describe('When user fills the form', () => {
    const fillForm = () => {
      fireEvent.change(screen.getByLabelText('Name *'), {
        target: { value: 'Toilet Paper' },
      })

      fireEvent.change(screen.getByLabelText('Quantity *'), {
        target: { value: 5 },
      })

      fireEvent.change(screen.getByLabelText('Form *'), {
        target: { value: 'Rolls' },
      })
    }

    const submitForm = () => {
      screen.getByLabelText('Add Button').click()
    }

    it('should make a request to the server', () => {
      renderStorageAddItemView()

      fillForm()
      submitForm()

      expect(addItem).toHaveBeenCalledWith(
        {
          form: 'Rolls',
          icon: 'product',
          name: 'Toilet Paper',
          quantity: 5,
        },
        'storage'
      )
    })

    describe('And the server returns a successful response', () => {
      it('should navigate the user to /storage', async () => {
        const navigateSpy = jest.fn()
        const useNavigateMock = useNavigate as jest.Mock

        useNavigateMock.mockReturnValue(navigateSpy)

        const mockedAddItem = addItem as jest.Mock
        mockedAddItem.mockResolvedValue({})

        renderStorageAddItemView()

        fillForm()
        submitForm()

        await waitFor(() =>
          expect(navigateSpy).toHaveBeenCalledWith('/storage')
        )
      })
    })

    describe('And the server returns an unsuccessful response', () => {
      it('should NOT navigate the user to /storage', async () => {
        const navigateSpy = jest.fn()
        const useNavigateMock = useNavigate as jest.Mock

        useNavigateMock.mockReturnValue(navigateSpy)

        const mockedAddItem = addItem as jest.Mock
        mockedAddItem.mockResolvedValue(false)

        renderStorageAddItemView()

        fillForm()
        submitForm()

        await wait()

        expect(navigateSpy).not.toHaveBeenCalled()
      })
    })
  })
})
