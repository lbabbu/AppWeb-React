import { useEffect, useState } from 'react'
import {
  GetIssuesApiResponse,
  SearchIssuesApiResponse,
} from '../../lib/api/response'
import { Board } from '../../service/board/service'
import { Box, Flex, Spinner, useToast } from '@chakra-ui/react'
import BoardSelector from './BoardSelector'
import KanbanBody from './KanbanBody'
import { Issue, IssueType } from '../../service/issue/service'
import { CreateIssueHandler, GetBoardsHandler, GetIssuesHandler, SearchIssuesHandler, UpdateIssueStatusHandler } from '../../service/service'

export type KanbanBoardDisplaySettings = {
  showFilters?: boolean
  showBoardSelector?: boolean
}

interface KanbanBoardProps {
  // Optional callbacks
  onBoardSelected?: (board: Board) => void
  onIssueSelected?: (issue: Issue) => void

  // Display settings
  settings?: KanbanBoardDisplaySettings
  // External API calls
  loadBoards: GetBoardsHandler
  loadBoardIssues: GetIssuesHandler
  queryBoardIssues: SearchIssuesHandler
  onCreateIssue: CreateIssueHandler
  onIssueUpdate: UpdateIssueStatusHandler
}

const KanbanBoard = ({
  onBoardSelected,
  loadBoardIssues,
  queryBoardIssues,
  loadBoards,
  onCreateIssue,
  onIssueUpdate,
  settings = {
    showFilters: true,
    showBoardSelector: true,
  },
  onIssueSelected
}: KanbanBoardProps) => {
  // List of boards + selected board
  const [boards, setBoards] = useState<Board[]>([])
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  const [boardError, setBoardError] = useState<string | null>(null)

  // Query states (string query + selected type)
  const [issueQueryFilter, setIssueQueryFilter] = useState<string>('')
  const [selectedType, setSelectedType] = useState<IssueType | null>(null)

  // Keep track of the available issues + loading errors + filtered issues + filter enabled state
  const [issues, setIssues] = useState<GetIssuesApiResponse>([])
  const [isUsingFilters, setIsUsingFilters] = useState<boolean>(false)
  const [queryIssues, setQueryIssues] = useState<SearchIssuesApiResponse>([])
  const [issuesError, setIssuesError] = useState<string | null>(null)

  // Loading state for spinners
  const [isLoadingBoards, setIsLoadingBoards] = useState<boolean>(false)
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(false)
  const [isComputingQuery, setIsComputingQuery] = useState<boolean>(false)

  // Load toasts
  const toast = useToast()

  // Fetch boards on mount
  useEffect(() => {
    setIsLoadingBoards(true)
    loadBoards()
      .then(boards => {
        setBoards(boards)
      })
      .catch(err => {
        // Set error
        setBoardError("An error has occurred while fetching boards: " + err)
      })
      .finally(() => {
        setIsLoadingBoards(false)
      })
  }, [])

  // If user is using filters, I want that queryIssues are updated if a new issue is created in "issues" array
  useEffect(() => {
    if (isUsingFilters && selectedBoard) {
      setIsComputingQuery(true)
      queryBoardIssues(selectedBoard.id, {
        query: issueQueryFilter,
        type: selectedType ? selectedType : undefined
      })
        .then(issues => {
          setQueryIssues(issues)
        })
        .catch(err => {
          console.error(err)
          toast({
            title: "An error has occurred while fetching issues",
            description: err,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        })
        .finally(() => {
          setIsComputingQuery(false)
        })
    }
  }, [issues])

  // Select first board on mount if board selector is disabled
  useEffect(() => {
    if (!settings.showBoardSelector && boards.length > 0 && !selectedBoard) {
      setSelectedBoard(boards[0])
    }
  }, [boards, settings.showBoardSelector])

  // Load issues when board is selected
  useEffect(() => {
    if (selectedBoard) {
      setIsLoadingIssues(true)
      loadBoardIssues(selectedBoard.id)
        .then(issues => {
          setIssues(issues)
        })
        .catch(err => {
          console.error(err)
          alert('Error while fetching issues: ' + err)
        })
        .finally(() => {
          setIsLoadingIssues(false)
        })
    }
  }, [selectedBoard])

  return (
    <Flex color="black">
      {/* Board selector */}
      {settings.showBoardSelector && (
        <Box
          borderRight="1px solid #e2e8f0"
          maxH={'100vh'}
          overflowY="auto"
        >
          {isLoadingBoards ? (
            <Flex justifyContent="center" alignItems="center" h="100%">
              <Spinner />
            </Flex>
          ) : (
            <BoardSelector
              selectedBoard={selectedBoard}
              boards={boards || []}
              error={boardError}
              onBoardSelected={board => {
                // Remove query value
                setIssueQueryFilter('')
                if (board.id !== selectedBoard?.id) {
                  // Save selected board
                  setSelectedBoard(board)
                  // Notify user if callback is set
                  onBoardSelected && onBoardSelected(board)
                } else {
                  setSelectedBoard(null)
                }
              }}
            />
          )}
        </Box>
      )}

      {/* Kanban body (columns + issues) */}
      <Box w="100%">
        {isLoadingIssues ? (
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Spinner />
          </Flex>
        ) : (
          <KanbanBody
            showFilters={settings.showFilters}
            board={selectedBoard}
            issues={isUsingFilters ? queryIssues : issues}
            error={issuesError}
            isComputingQuery={isComputingQuery}
            issueQueryFilter={issueQueryFilter}
            issueTypeFilter={selectedType}
            onQueryFilterChange={query => {
              // Update query filter
              setIssueQueryFilter(query)
            }}
            onIssueQuery={async (query, type) => {
              // set loading state
              setIsComputingQuery(true)
              // Check if API query is needed
              setIssueQueryFilter(query)
              // Update selected type
              setSelectedType(type)

              // Query issues (block execution)
              if (query !== '' || type !== null) {
                // Set filter enabled state
                if (!isUsingFilters) setIsUsingFilters(true)

                // Query issues using input (block execution to avoid useless render)
                queryBoardIssues(selectedBoard!.id, {
                  query,
                  type: type || undefined,
                })
                  .then(issues => {
                    // Set query issues
                    setQueryIssues(issues)
                  }).catch(err => {
                    // Set error
                    setIssuesError(err.message)
                  }).finally(() => {
                    // Reset loading state
                    setIsComputingQuery(false)
                  })
              } else {
                // Reset query issues
                setQueryIssues([])
                // Set filter enabled state
                setIsUsingFilters(false)
                // Reset loading state
                setIsComputingQuery(false)
              }
            }}
            onCreateIssue={(board, issueInput) => {
              // Call external create issue logic
              onCreateIssue(board.id, issueInput)
                .then(issue => {
                  // Add issue to issues list
                  setIssues([...issues, issue])

                  // Show toast
                  toast({
                    title: 'Issue created successfully',
                    status: 'success',
                    duration: 3000,
                    size: 'sm',
                    isClosable: true,
                  })
                })
                .catch(err => {
                  // Set error
                  setIssuesError(err.message)
                })
            }}
            onIssueUpdate={async (issueId, status) => {
              // Print all issues here
              onIssueUpdate(issueId, status)
                .then((isOk) => {
                  if (isOk) {
                    // Update issue id status
                    const updatedIssues = issues.map(issue => {
                      if (issue.id == issueId) {
                        return {
                          ...issue,
                          status,
                        }
                      }
                      return issue
                    })

                    // Update issues
                    setIssues(updatedIssues)

                    // Show toaast
                    toast({
                      title: 'Issue updated successfully',
                      status: 'success',
                      duration: 3000,
                      size: 'sm',
                      isClosable: true,
                    })
                  } else {
                    // Show toaast
                    toast({
                      title: 'Issue updated failed',
                      status: 'error',
                      duration: 3000,
                      size: 'sm',
                      isClosable: true,
                    })
                  }
                })
                .catch(err => {
                  setIssuesError(err.message)
                })
            }}
            onIssueSelect={onIssueSelected}
          />
        )}

      </Box>
    </Flex>
  )
}

export default KanbanBoard
