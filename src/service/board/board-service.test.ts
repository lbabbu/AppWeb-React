import * as fetcher from '../../lib/fetcher'
import { getBoards } from './board-service'

// Spy on the fetcher function
const spy = jest.spyOn(fetcher, 'default')

describe('getBoards', () => {
  it('should call fetcher with the correct URL and return the expected value', async () => {
    // spy on fetcher function
    const expectedData = [{ id: 1, name: 'Board 1' }]

    // Mock the fetcher function to return the expected data
    spy.mockReturnValue(Promise.resolve(expectedData))

    // Define the expected URL and response data
    const expectedUrl = `${process.env.REACT_APP_API_BASE_URL}/boards`

    // Call the function
    const actualData = await getBoards()

    // Check how many times fetcher was called
    expect(fetcher.default).toHaveBeenCalledTimes(1)
    // Check that fetcher was called with the expected URL
    expect(fetcher.default).toHaveBeenCalledWith({ url: expectedUrl })
    // Check that the actual data returned by the function matches the expected data
    expect(actualData).toEqual(expectedData)
  })
})

// Restore mock after each test
afterEach(() => {
  spy.mockRestore()
})
