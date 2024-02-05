import { screen, render } from '@testing-library/react'
import Navigation from '.'
import { AppState, initialState } from '../../state'
import { useNavigate } from 'react-router-dom'

const renderStorage = ({
  previousRoute = '/',
  actionButton = undefined,
} = {}) => {
  const dispatchSpy = jest.fn()

  render(
    <AppState.Provider
      value={{ state: { ...initialState }, dispatch: dispatchSpy }}
    >
      <Navigation previousRoute={previousRoute} actionButton={actionButton} />
    </AppState.Provider>
  )

  return { dispatchSpy }
}

describe('Given the Navigation component', () => {
  it('should render the back button', () => {
    renderStorage()

    expect(screen.getByLabelText('Back Button')).toBeVisible()
  })

  describe('When the back button is pressed', () => {
    it('shoudl go to the provided route', () => {
      const navigate = jest.fn()
      const mockUseNavigate = useNavigate as jest.Mock

      mockUseNavigate.mockReturnValue(navigate)

      renderStorage({ previousRoute: '/my/previous/route' })

      screen.getByLabelText('Back Button').click()

      expect(navigate).toBeCalledWith('/my/previous/route')
    })
  })

  describe('When the actionButton is provided', () => {
    it('should render the given component', () => {
      const exampleComponent = <span aria-label="my-span">Hello</span>

      renderStorage({ actionButton: exampleComponent })

      expect(screen.getByLabelText('my-span')).toBeVisible()
      expect(screen.getByText('Hello')).toBeVisible()
    })
  })
})
