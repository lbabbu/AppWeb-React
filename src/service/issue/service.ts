export type IssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type IssueType = 'TASK' | 'BUG' | 'USER_STORY'

export type Issue = {
  /**
   * The id of the issue
   */
  id: string

  /**
   * The title of the issue
   */
  title: string

  /**
   * The current status of the issue. Possible values: Todo, In Progress or Done
   */
  status: IssueStatus

  /**
   * The type of the issue. Possible values: Task, Bug or User Story
   */
  type: IssueType

  /**
   * List of board ids that the issue is associated with
   */
  boards: number[]
}

export type SearchIssuesInput = {
  query: string
  type: IssueType
}

export type CreateIssueInput = {
  title: string
}

export type UpdateIssueInput = {
  status: IssueStatus
}
