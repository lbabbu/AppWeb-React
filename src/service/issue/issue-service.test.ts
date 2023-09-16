import * as fetcher from '../../lib/fetcher'
import * as issueService from './issue-service'

describe('getIssues', () => {
  it('should call fetcher with the correct URL and return the expected value', async () => {
    // Mock fetcher function to return expected data
    const expectedData = [{ id: 1, name: 'Issue 1' }]
    let spy = jest.spyOn(fetcher, 'default')
    spy.mockResolvedValue(expectedData)

    // Define expected URL and response data
    const expectedUrl = `${process.env.REACT_APP_API_BASE_URL}/boards/1`
    const expectedApiKey = process.env.REACT_APP_API_KEY

    // Call function
    const actualData = await issueService.getIssues(1)

    // Check how many times fetcher was called
    expect(fetcher.default).toHaveBeenCalledTimes(1)
    // Check that fetcher was called with the expected URL
    expect(fetcher.default).toHaveBeenCalledWith({
      apiKey: expectedApiKey,
      url: expectedUrl,
    })
    // Check that the actual data returned by the function matches the expected data
    expect(actualData).toEqual(expectedData)
    spy.mockRestore()
  })
})

describe('searchIssues', () => {
  it('should call fetcher with the correct URL and return the expected value', async () => {
    // Mock fetcher function to return expected data
    const expectedData = [{ id: 1, name: 'Issue 1' }]
    let spy = jest.spyOn(fetcher, 'default')
    spy.mockResolvedValue(expectedData)

    // Define expected URL and response data
    const expectedUrl = `${process.env.REACT_APP_API_BASE_URL}/boards/1/search?search=Issue&issueType=BUG`
    const expectedApiKey = process.env.REACT_APP_API_KEY

    // Call function
    const actualData = await issueService.searchIssues(1, {
      query: 'Issue',
      type: 'BUG',
    })

    // Check how many times fetcher was called
    expect(fetcher.default).toHaveBeenCalledTimes(1)
    // Check that fetcher was called with the expected URL
    expect(fetcher.default).toHaveBeenCalledWith({
      apiKey: expectedApiKey,
      url: expectedUrl,
    })
    // Check that the actual data returned by the function matches the expected data
    expect(actualData).toEqual(expectedData)
    spy.mockRestore()
  })
})

describe('createIssue', () => {
  it('should call fetcher with the correct URL and return the expected value', async () => {
    // Mock fetcher function to return expected data
    const expectedData = { id: 1, name: 'Issue 1' }
    let spy = jest.spyOn(fetcher, 'default')
    spy.mockResolvedValue(expectedData)

    // Define expected URL and response data
    const expectedUrl = `${process.env.REACT_APP_API_BASE_URL}/boards/1/issues`
    const expectedApiKey = process.env.REACT_APP_API_KEY

    // Call function
    const actualData = await issueService.createIssue(1, {
      title: 'Issue 1',
    })

    // Check how many times fetcher was called
    expect(fetcher.default).toHaveBeenCalledTimes(1)
    // Check that fetcher was called with the expected URL
    expect(fetcher.default).toHaveBeenCalledWith({
      apiKey: expectedApiKey,
      url: expectedUrl,
      method: 'POST',
      body: { title: 'Issue 1' },
    })
    // Check that the actual data returned by the function matches the expected data
    expect(actualData).toEqual(expectedData)
    spy.mockRestore()
  })
})

describe('updateIssueStatus', () => {
  it('should call fetcher with the correct URL and return the expected value', async () => {
    // Mock fetcher function to return expected data
    // Create sample successful Response object
    const response = new Response()
    let spy = jest.spyOn(fetcher, 'rawFetcher')
    spy.mockResolvedValue(response)

    // Define expected URL and response data
    const expectedUrl = `${process.env.REACT_APP_API_BASE_URL}/issues/1/status`
    const expectedApiKey = process.env.REACT_APP_API_KEY

    // Call function
    const actualData = await issueService.updateIssueStatus("1", 'DONE')

    // Check how many times fetcher was called
    expect(fetcher.rawFetcher).toHaveBeenCalledTimes(1)
    // Check that fetcher was called with the expected URL
    expect(fetcher.rawFetcher).toHaveBeenCalledWith({
      url: expectedUrl,
      method: 'PUT',
      body: { status: 'DONE' },
      apiKey: expectedApiKey,
    })

    // Check that the actual data returned by the function matches the expected data
    expect(actualData).toEqual(true)
  })
})

// Path: src/service/issue/issue-service.test.ts
