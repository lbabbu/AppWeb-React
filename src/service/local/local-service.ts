const getLocalBoardStorageKey = () => {
  if (!process.env.REACT_APP_LOCALSTORAGE_BOARDS) {
    throw new Error('REACT_APP_LOCALSTORAGE_BOARDS is not set')
  }
  return process.env.REACT_APP_LOCALSTORAGE_BOARDS
}

const getLocalIssueStorageKey = () => {
  if (!process.env.REACT_APP_LOCALSTORAGE_ISSUES) {
    throw new Error('REACT_APP_LOCALSTORAGE_ISSUES is not set')
  }
  return process.env.REACT_APP_LOCALSTORAGE_ISSUES
}

const persist = async (key: string, data: any) => {
  // Save data to local storage
  localStorage.setItem(key, JSON.stringify(data))
}

const isBoardStorageInitialized = () => {
  return localStorage.getItem(getLocalBoardStorageKey()) !== null
}

const isIssueStorageInitialized = () => {
  return localStorage.getItem(getLocalIssueStorageKey()) !== null
}

export {
  getLocalBoardStorageKey,
  getLocalIssueStorageKey,
  persist,
  isBoardStorageInitialized,
  isIssueStorageInitialized,
}
