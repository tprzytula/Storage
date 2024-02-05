jest.mock('../../api')

import { screen, render } from '@testing-library/react'
import Icons8 from '.'

describe('Given the Icons8 component', () => {
  it('should render text about the author of the icons', () => {
    render(<Icons8 />)

    expect(screen.getByText('Icons from icons8.com')).toBeVisible()
  })
})
