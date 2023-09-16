import { getBoards } from "../../service/board/board-service"
import { Board } from "../../service/board/service"
import { getIssues, searchIssues, createIssue, updateIssueStatus } from "../../service/issue/issue-service"
import { Issue } from "../../service/issue/service"
import KanbanBoard, { KanbanBoardDisplaySettings } from "../kanban/KanbanBoard"

interface ApiKanbanBoardProps {
  // Display settings
  displaySettings?: KanbanBoardDisplaySettings
  onIssueSelected?: (issue: Issue) => void
  onBoardSelected?: (board: Board) => void
}

const ApiKanbanBoard = ({ displaySettings, onIssueSelected, onBoardSelected }: ApiKanbanBoardProps) => {
  return (
    <KanbanBoard
      settings={displaySettings}
      loadBoards={async () => {
        // Api call to get boards
        return await getBoards()
      }}
      loadBoardIssues={async boardId => {
        // Api call to get board issues
        return await getIssues(boardId)
      }}
      queryBoardIssues={async (boardId, filter) => {
        return await searchIssues(boardId, filter)
      }}
      onCreateIssue={async (boardId, issueInput) => {
        // return await onCreateIssue(board, issue)
        return await createIssue(boardId, issueInput)
      }}
      onIssueUpdate={async (issueId, status) => {
        return await updateIssueStatus(issueId, status)
      }}
      onIssueSelected={onIssueSelected}
      onBoardSelected={onBoardSelected}
    />
  )
}

export default ApiKanbanBoard