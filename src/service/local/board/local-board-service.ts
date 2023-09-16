import { Board } from '../../board/service'
import { getLocalBoardStorageKey, persist } from '../local-service'

const getBoards = async (): Promise<Board[]> => {
  const key = getLocalBoardStorageKey()
  const boards = JSON.parse(localStorage.getItem(key) || '[]')
  return boards
}

const getBoard = async (boardId: number): Promise<Board> => {
  const boards = await getBoards()
  const board = boards.find(board => board.id === boardId)
  if (!board) {
    throw new Error(`Board with id ${boardId} not found`)
  }
  return board
}

const saveBoards = async (boards: Board[]) => {
  const key = getLocalBoardStorageKey()
  persist(key, boards)
}

const saveBoard = async (board: Board) => {
  const boards = await getBoards()
  let index = boards.findIndex(b => b.id === board.id)
  if (index === -1) {
    // Board not found, add it
    index = boards.length
  }
  boards[index] = board
  saveBoards(boards)
}

export { getBoards, getBoard, saveBoards, saveBoard }
