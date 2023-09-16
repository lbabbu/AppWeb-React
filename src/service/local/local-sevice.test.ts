import * as localService from './local-service'

describe('getLocalBoardStorageKey', () => {
  it('should return the correct key', () => {
    // Mock process.env.REACT_APP_LOCALSTORAGE_BOARDS to return a value
    process.env.REACT_APP_LOCALSTORAGE_BOARDS = 'boards'
    const expectedKey = 'boards'
    const actualKey = localService.getLocalBoardStorageKey()
    expect(actualKey).toEqual(expectedKey)
  })
})

describe('getLocalIssueStorageKey', () => {
  it('should return the correct key', () => {
    // Mock process.env.REACT_APP_LOCALSTORAGE_ISSUES to return a value
    process.env.REACT_APP_LOCALSTORAGE_ISSUES = 'issues'
    const expectedKey = 'issues'
    const actualKey = localService.getLocalIssueStorageKey()
    expect(actualKey).toEqual(expectedKey)
  })
})

describe('persist', () => {
  it('should call localStorage.setItem with the correct key and value', () => {
    // Mock localStorage.setItem to return a value
    const spy = jest.spyOn(Storage.prototype, 'setItem')
    const expectedKey = 'key'
    const expectedValue = 'value'
    localService.persist(expectedKey, expectedValue)
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1)
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      expectedKey,
      JSON.stringify('value')
    )
    spy.mockRestore()
  })
})

describe('isBoardStorageInitialized', () => {
  it('should return true if localStorage.getItem returns a value', () => {
    // Mock localStorage.getItem to return a value
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue('value')
    const actual = localService.isBoardStorageInitialized()
    expect(actual).toEqual(true)

    // Now check if it returns false if localStorage.getItem returns null
    spy.mockReturnValue(null)
    const actual2 = localService.isBoardStorageInitialized()
    expect(actual2).toEqual(false)

    spy.mockRestore()
  })
})

describe('isIssueStorageInitialized', () => {
  it('should return true if localStorage.getItem returns a value', () => {
    // Mock localStorage.getItem to return a value
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue('value')
    const actual = localService.isIssueStorageInitialized()
    expect(actual).toEqual(true)

    // Now check if it returns false if localStorage.getItem returns null
    spy.mockReturnValue(null)
    const actual2 = localService.isIssueStorageInitialized()
    expect(actual2).toEqual(false)

    spy.mockRestore()
  })
})
