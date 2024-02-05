import { screen, render, act } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { StateComponent } from '../state'
import theme from '../theme'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root'

const renderRoot = () => {
  render(
    <ThemeProvider theme={theme}>
      <StateComponent>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </StateComponent>
    </ThemeProvider>
  )
}

describe('Given the Root component', () => {
  it('should have the correct title', () => {
    renderRoot()
    expect(screen.getByText('Manage Storage on your device')).toBeVisible()
  })

  it('should have the correct sub title', () => {
    renderRoot()
    expect(
      screen.getByText(
        'Storage Manager helps you to keep track of your belongings'
      )
    ).toBeVisible()
  })

  it('should have the correct icon displayed', () => {
    renderRoot()
    expect(screen.getByTitle('Warehouse')).toBeInTheDocument()
  })

  it('should have the correct button', () => {
    renderRoot()
    expect(
      screen.getByRole('button', { name: 'Start organising' })
    ).toBeVisible()
  })

  describe('When  the Start organising button is pressed', () => {
    it('should move user to the storage view', async () => {
      const navigateSpy = jest.fn()
      const mockedUseNavigate = useNavigate as jest.Mock

      mockedUseNavigate.mockReturnValue(navigateSpy)

      renderRoot()

      act(() => {
        screen.getByRole('button', { name: 'Start organising' }).click()
      })

      expect(navigateSpy).toBeCalledWith('/storage')
    })
  })
})
