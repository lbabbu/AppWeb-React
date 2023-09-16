
import { useEffect } from "react"
import { Board } from "../../service/board/service"
import { Issue } from "../../service/issue/service"
import { getBoards, saveBoards } from "../../service/local/board/local-board-service"
import { createIssue, getIssues, saveIssues, searchIssues, updateIssueStatus } from "../../service/local/issue/local-issue-service"
import { isBoardStorageInitialized, isIssueStorageInitialized } from "../../service/local/local-service"
import KanbanBoard, { KanbanBoardDisplaySettings } from "../kanban/KanbanBoard"

interface LocalKanbanBoardProps {
  displaySettings?: KanbanBoardDisplaySettings
  onIssueSelected?: (issue: Issue) => void
  onBoardSelected?: (board: Board) => void
  boards: Board[]
  issues: Issue[]
}

const LocalKanbanBoard = ({ displaySettings, onIssueSelected, onBoardSelected, boards, issues }: LocalKanbanBoardProps) => {
  useEffect(() => {
    // Check if there is a board in the local storage
    // If not, populate the local storage with the default boards
    if (!isBoardStorageInitialized()) {
      console.info('No boards found in the local storage.')
      saveBoards(boards)
      console.log('Default boards saved in the local storage.')
    }
    if (!isIssueStorageInitialized()) {
      console.info('No issues found in the local storage.')
      saveIssues(issues)
      console.log('Default issues saved in the local storage')
    }
  }, [])

  return (
    <KanbanBoard
      settings={displaySettings}
      loadBoards={async () => {
        // Get boards from local storage
        return await getBoards()
      }}
      loadBoardIssues={async boardId => {
        // Get issues from a board in the local storage
        return await getIssues(boardId)
      }}
      queryBoardIssues={async (boardId, filter) => {
        // Search issues in a board in the local storage
        return await searchIssues(boardId, filter)
      }}
      onCreateIssue={async (boardId, issueInput) => {
        // Create an issue in a board in the local storage
        return await createIssue(boardId, issueInput)
      }}
      onIssueUpdate={async (issueId, status) => {
        // Update the status of an issue in a board in the local storage
        return await updateIssueStatus(issueId, status)
      }}
      onIssueSelected={onIssueSelected}
      onBoardSelected={onBoardSelected}
    />
  )
}

export default LocalKanbanBoard