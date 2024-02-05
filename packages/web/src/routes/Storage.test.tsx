jest.mock('../api')

import { waitFor, screen, render } from '@testing-library/react'
import Storage from './Storage'
import { retrieveItems } from '../api'
import { AppState, initialState } from '../state'

const renderStorage = () => {
  const dispatchSpy = jest.fn()

  render(
    <AppState.Provider
      value={{ state: { ...initialState }, dispatch: dispatchSpy }}
    >
      <Storage />
    </AppState.Provider>
  )

  return { dispatchSpy }
}

describe('Given the Storage component', () => {
  it('should have the correct title', () => {
    renderStorage()

    expect(screen.getByText('Storage')).toBeVisible()
  })

  it('should make a request to retrieve the items', () => {
    renderStorage()

    expect(retrieveItems).toHaveBeenCalled()
  })

  it('should show loading spinner when the data is being retrieved', () => {
    renderStorage()

    expect(screen.getByRole('progressbar')).toBeVisible()
  })

  describe('And the request return items', () => {
    const exampleItems = [
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

    it('should fire a dispatch to save the items into state', async () => {
      const mockedFunction = retrieveItems as jest.Mock
      mockedFunction.mockResolvedValue(exampleItems)

      const { dispatchSpy } = renderStorage()

      await waitFor(() =>
        expect(dispatchSpy).toHaveBeenCalledWith({
          payload: [
            {
              form: 'rolls',
              id: '1',
              icon: 'water',
              name: 'Toilet Paper',
              quantity: 5,
            },
            {
              form: 'rolls',
              id: '2',
              icon: 'water',
              name: 'Paper Towel',
              quantity: 2,
            },
          ],
          type: 'SET_STORAGE',
        })
      )
    })
  })

  it('should render the back button', () => {
    renderStorage()

    expect(screen.getByLabelText('Back Button')).toBeVisible()
  })
})
