import { Board } from './board/service'
import {
  CreateIssueInput,
  Issue,
  IssueStatus,
  SearchIssuesInput,
} from './issue/service'

export type GetBoardsHandler = () => Promise<Board[]>

export type GetIssuesHandler = (boardId: number) => Promise<Issue[]>

export type CreateIssueHandler = (
  boardId: number,
  input: CreateIssueInput
) => Promise<Issue>

export type UpdateIssueStatusHandler = (
  issueUuid: string,
  status: IssueStatus
) => Promise<boolean>

export type SearchIssuesHandler = (
  boardId: number,
  input: Partial<SearchIssuesInput>
) => Promise<Issue[]>
