import { Board } from '../../service/board/service'
import { Issue } from '../../service/issue/service'

// GET /boards
export type GetBoardsApiResponse = Board[]

// GET /boards/:id
export type GetIssuesApiResponse = Issue[]

// GET /boards/:id/search
export type SearchIssuesApiResponse = Issue[]

// POST /boards/:id/issues
export type CreateIssueApiResponse = Issue

// PUT /issues/:id/status
export type UpdateIssueStatusApiResponse = boolean // True if successful, false otherwise
