import { screen, render } from '@testing-library/react'
import StorageItems from '.'
import { AppState, initialState } from '../../state'

const exampleStorage = [
  {
    id: '1',
    name: 'Toilet Paper',
    amount: 5,
    type: 'rolls',
  },
  {
    id: '2',
    name: 'Paper Towel',
    amount: 2,
    type: 'rolls',
  },
]
const renderStorageItems = (state) => {
  render(
    <AppState.Provider
      value={{ state: { ...initialState, ...state }, dispatch: jest.fn() }}
    >
      <StorageItems />
    </AppState.Provider>
  )
}

describe('Given the StorageItems component', () => {
  it('should render all of the storage items', () => {
    renderStorageItems({ storage: exampleStorage })

    expect(screen.getByText('Toilet Paper')).toBeVisible()
    expect(screen.getByText('Paper Towel')).toBeVisible()
  })

  describe('When the storage is empty', () => {
    it('should render a message', () => {
      renderStorageItems({ storage: [] })

      expect(
        screen.getByText(
          'Storage is empty. You can add new items by pressing on the + button.'
        )
      ).toBeVisible()
    })
  })
})
