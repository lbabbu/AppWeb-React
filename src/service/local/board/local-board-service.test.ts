import { Board } from '../../board/service'
import * as localBoardService from './local-board-service'

const sampleBoards: Board[] = [
  {
    id: 1,
    name: 'Board 1',
  },
  {
    id: 2,
    name: 'Board 2',
  },
]

describe('getBoards', () => {
  it('should return an empty array if no boards are found', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(null)

    // Call getBoards
    const boards = await localBoardService.getBoards()

    // Check if boards is an empty array
    expect(Array.isArray(boards)).toEqual(true)
    expect(boards.length).toEqual(0)

    // Reset mock
    spy.mockReset()
  })
})

describe('getBoards', () => {
  it('should return an array of boards', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(JSON.stringify(sampleBoards))

    // Call getBoards
    const boards = await localBoardService.getBoards()

    // Check if boards is an array with two boards
    expect(Array.isArray(boards)).toEqual(true)
    expect(boards.length).toEqual(2)
    expect(boards[0].id).toEqual(1)
    expect(boards[0].name).toEqual('Board 1')
    expect(boards[1].id).toEqual(2)
    expect(boards[1].name).toEqual('Board 2')

    // Reset mock
    spy.mockReset()
  })
})

describe('getBoard', () => {
  it('should return a board with the given id', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    spy.mockReturnValue(JSON.stringify(sampleBoards))

    // Call getBoard with boardId 1
    const board = await localBoardService.getBoard(1)

    // Check if board has the correct id
    expect(board.id).toEqual(1)
    expect(board.name).toEqual('Board 1')

    // Call getBoard with boardId 2
    const board2 = await localBoardService.getBoard(2)

    // Check if board has the correct id
    expect(board2.id).toEqual(2)
    expect(board2.name).toEqual('Board 2')

    // Reset mock
    spy.mockReset()
  })
})

describe('saveBoard', () => {
  it('should save a new board', async () => {
    // Spy on localstorage
    const spy = jest.spyOn(Storage.prototype, 'getItem')
    const spy2 = jest.spyOn(Storage.prototype, 'setItem')
    spy.mockReturnValue(JSON.stringify(sampleBoards))

    // Read local storage key from environment
    const expectedKey = process.env.REACT_APP_LOCALSTORAGE_BOARDS
    
    // Call saveBoard with a new board
    await localBoardService.saveBoard({
      id: 3,
      name: 'Board 3',
    })

    // Check if board has the correct id
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      expectedKey,
      JSON.stringify([
      ...sampleBoards,
      {
        id: 3,
        name: 'Board 3',
      }
      ])
    )

    // Reset mock
    spy.mockReset()
    spy2.mockReset()
  })
})
