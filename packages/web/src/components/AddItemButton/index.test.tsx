import { screen, render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AddItem from '.'

describe('Given the AddItem component', () => {
  it('should render the name', () => {
    render(
      <HashRouter>
        <AddItem />
      </HashRouter>
    )

    expect(screen.getByLabelText('Add Icon')).toBeVisible()
  })

  describe('When the add icon is pressed', () => {
    it('should change view to /storage/add', () => {
      const navigateSpy = jest.fn()
      const mockedUseNavigate = useNavigate as jest.Mock

      mockedUseNavigate.mockReturnValue(navigateSpy)

      render(
        <HashRouter>
          <AddItem />
        </HashRouter>
      )

      screen.getByLabelText('Add Icon').click()

      expect(navigateSpy).toBeCalledWith('/storage/add')
    })
  })
})
