jest.mock('../../api')

import { screen, render } from '@testing-library/react'
import BackButton from '.'
import { useNavigate } from 'react-router-dom'

const renderBackButton = (route) => {
  render(<BackButton route={route} />)
}

describe('Given the BackButton component', () => {
  it('should render the button', () => {
    renderBackButton('/my/route')

    expect(screen.getByLabelText('Back Button')).toBeVisible()
  })

  describe('When clicks on the button', () => {
    it('should change to the given route', () => {
      const navigateSpy = jest.fn()
      const mockUseNavigate = useNavigate as jest.Mock

      mockUseNavigate.mockReturnValue(navigateSpy)

      renderBackButton('/my/route')

      screen.getByLabelText('Back Button').click()

      expect(navigateSpy).toHaveBeenCalledWith('/my/route')
    })
  })
})
