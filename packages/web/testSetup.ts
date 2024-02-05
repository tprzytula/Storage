import '@testing-library/jest-dom'
import jestFetchMock from 'jest-fetch-mock'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}))

jestFetchMock.enableMocks()
