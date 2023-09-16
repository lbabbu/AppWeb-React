import { Issue } from '../../issue/service'
import {
  CreateIssueHandler,
  GetIssuesHandler,
  SearchIssuesHandler,
  UpdateIssueStatusHandler,
} from '../../service'
import { generateUuidv4 } from '../generator/generator-service'
import { getLocalIssueStorageKey, persist } from '../local-service'

const filterByBoardId = (issues: Issue[], boardId: number) => {
  return issues.filter(issue => issue.boards.includes(boardId))
}

const getAllIssues = (): Issue[] => {
  // Fetch issues from local storage
  const key = getLocalIssueStorageKey()
  const issues = JSON.parse(localStorage.getItem(key) || '[]')
  return issues
}

const getIssues: GetIssuesHandler = async boardId => {
  // Filter issues by board id
  return filterByBoardId(getAllIssues(), boardId)
}

const createIssue: CreateIssueHandler = async (boardId, input) => {
  // Fetch all issues
  const issues = getAllIssues()

  // Create a new issue from input
  const newIssue: Issue = {
    id: generateUuidv4(),
    title: input.title,
    boards: [boardId],
    status: 'TODO',
    type: 'TASK',
  }

  // Add new issue to issues
  issues.push(newIssue)

  // Save issues to local storage
  saveIssues(issues)

  // Return the newly created issue
  return newIssue
}

const updateIssueStatus: UpdateIssueStatusHandler = async (
  issueUuid,
  status
) => {
  // Get all issues
  const issues = await getAllIssues()

  // Find the issue
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == issueUuid) {
      // Update status
      issues[i].status = status
      // Persist issue
      saveIssues(issues)
      // Return success
      return true
    }
  }
  return false
}

const searchIssues: SearchIssuesHandler = async (boardId, input) => {
  // Fetch issues from board
  let issues = await getIssues(boardId).catch(error => {
    throw error
  })

  // Try to filter by type (if provided)
  if (input.type) {
    issues = issues.filter(issue => issue.type === input.type)
  }
  // try to filter by query (if provided)
  if (input.query) {
    issues = issues.filter(issue => issue.title.includes(input.query!))
  }

  // Return filtered issues
  return issues
}

const saveIssues = (issues: Issue[]) => {
  const key = getLocalIssueStorageKey()
  persist(key, issues)
}

export { getIssues, createIssue, updateIssueStatus, searchIssues, saveIssues }
