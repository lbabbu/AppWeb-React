import {
  CreateIssueApiResponse,
  GetIssuesApiResponse,
  SearchIssuesApiResponse,
} from '../../lib/api/response'
import fetcher, { rawFetcher } from '../../lib/fetcher'
import {
  CreateIssueHandler,
  GetIssuesHandler,
  SearchIssuesHandler,
  UpdateIssueStatusHandler,
} from '../service'
import {
  IssueStatus,
  IssueType,
} from './service'

const getIssues: GetIssuesHandler = async boardId => {
  return fetcher<GetIssuesApiResponse>({
    url: process.env.REACT_APP_API_BASE_URL + `/boards/${boardId}`,
    apiKey: process.env.REACT_APP_API_KEY,
  })
}

const typeToString = (issueType: IssueType) => {
  switch (issueType) {
    case 'BUG':
      return 'Bug'
    case 'TASK':
      return 'Task'
    case 'USER_STORY':
      return 'User Story'
    default:
      return 'Unknown'
  }
}

const statusToString = (issueStatus: IssueStatus) => {
  switch (issueStatus) {
    case 'DONE':
      return 'Done'
    case 'IN_PROGRESS':
      return 'In Progress'
    case 'TODO':
      return 'To Do'
    default:
      return 'Unknown'
  }
}

const searchIssues: SearchIssuesHandler = async (boardId, input) => {
  // Build url by adding query parameters
  const newUrl = new URL(
    process.env.REACT_APP_API_BASE_URL + `/boards/${boardId}/search`
  )

  // Add query parameters (if passed)
  if (input.query) {
    newUrl.searchParams.append('search', input.query)
  }
  if (input.type) {
    newUrl.searchParams.append('issueType', input.type)
  }

  // Send API request using fetcher
  return await fetcher<SearchIssuesApiResponse>({
    url: newUrl.toString(),
    apiKey: process.env.REACT_APP_API_KEY,
  })
}

const createIssue: CreateIssueHandler = async (boardId, input) => {
  return await fetcher<CreateIssueApiResponse>({
    url: process.env.REACT_APP_API_BASE_URL + `/boards/${boardId}/issues`,
    method: 'POST',
    body: input,
    apiKey: process.env.REACT_APP_API_KEY,
  })
}

const updateIssueStatus: UpdateIssueStatusHandler = async (
  issueUuid,
  status
) => {
  return new Promise((resolve, reject) => {
    rawFetcher({
      url: process.env.REACT_APP_API_BASE_URL + `/issues/${issueUuid}/status`,
      method: 'PUT',
      body: {
        status,
      },
      apiKey: process.env.REACT_APP_API_KEY,
    })
      .then(() => {
        resolve(true)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export {
  getIssues,
  searchIssues,
  createIssue,
  updateIssueStatus,
  typeToString,
  statusToString,
}
