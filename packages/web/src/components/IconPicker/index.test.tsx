import { act, render, screen } from '@testing-library/react'
import IconPicker from '.'

const renderIconPicker = () => {
  const onChangeSpy = jest.fn()

  render(<IconPicker onChange={onChangeSpy} />)

  return { onChangeSpy }
}

describe('Given the IconPicker component', () => {
  it('should render the product icon by default', () => {
    renderIconPicker()

    expect(screen.getByAltText('product image')).toBeVisible()
  })

  it('should render the text to inform user that they can change icons', () => {
    renderIconPicker()

    expect(screen.getByText('Click to change Icon')).toBeVisible()
  })

  describe('When user clicks on the icon', () => {
    it('should open the modal', () => {
      renderIconPicker()

      act(() => {
        screen.getByAltText('product image').click()
      })

      expect(screen.getByText('Select Icon'))
    })

    describe('And then selects another icon', () => {
      it('should close the modal and change the icon', () => {
        renderIconPicker()

        act(() => {
          screen.getByAltText('product image').click()
        })

        act(() => {
          screen.getByAltText('flour image').click()
        })

        expect(screen.getByText('Click to change Icon')).toBeVisible()
        expect(screen.getByAltText('flour image')).toBeVisible()
      })
    })
  })
})
