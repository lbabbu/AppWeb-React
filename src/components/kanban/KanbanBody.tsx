import {
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { FaHeartBroken, FaInfoCircle } from 'react-icons/fa'
import { Board } from '../../service/board/service'
import { CreateIssueInput, Issue, IssueType } from '../../service/issue/service'
import SearchBar from '../input/SearchBar'
import { IssueStatus } from '../../service/issue/service'
import KanbanColumns from './KanbanColumns'

type OnCreateIssueCallback = (board: Board, issue: CreateIssueInput) => void

interface KanbanBodyProps {
  issueQueryFilter: string
  issueTypeFilter: IssueType | null
  board: Board | null
  issues: Issue[]
  error: string | null
  showFilters?: boolean
  isComputingQuery?: boolean
  onIssueSelect?: (issue: Issue) => void
  // Callback
  onQueryFilterChange: (query: string) => void
  onIssueQuery: (query: string, type: IssueType | null) => void
  onCreateIssue: OnCreateIssueCallback
  onIssueUpdate: (issueId: string, newStatus: IssueStatus) => void
}

type IssuesByStatus = {
  [key in IssueStatus]: Issue[]
}

const KanbanBody = ({
  issueQueryFilter,
  issueTypeFilter,
  board,
  issues,
  error,
  showFilters = true, //if true, show filters select and search bar
  isComputingQuery = false,
  onIssueSelect,
  onQueryFilterChange,
  onIssueQuery,
  onCreateIssue,
  onIssueUpdate,
}: KanbanBodyProps) => {
  // Writing status for debouncing
  const [isWritingQuery, setIsWritingQuery] = useState<boolean>(false)
  // State to save latest query sent to kanban (used to show correct query during debouncing)
  const [latestQuery, setLatestQuery] = useState<string>(issueQueryFilter)

  // Text color
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  useEffect(() => {
    // Debounce query execution
    if (isWritingQuery) {
      const timeout = setTimeout(() => {
        setIsWritingQuery(false)
        onIssueQuery(issueQueryFilter, issueTypeFilter)
        // Save latest query
        setLatestQuery(issueQueryFilter)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [issueQueryFilter])

  const anyIssueFound = useMemo(() => {
    return issues.length > 0
  }, [issues])

  // Divide issues by status
  const issuesByStatus: IssuesByStatus = useMemo(() => {
    return {
      TODO: issues.filter(issue => issue.status === 'TODO'),
      IN_PROGRESS: issues.filter(issue => issue.status === 'IN_PROGRESS'),
      DONE: issues.filter(issue => issue.status === 'DONE'),
    }
  }, [issues])

  // If no board selected, show message to user
  if (!board) {
    return (
      <Flex justifyContent="center" alignItems="center" w="100wh" gap={2} h={100}>
        <Icon as={FaInfoCircle} fontSize="4xl" color="blue.600" />
        <Text fontSize="lg" color={textColor}>
          Select a board to see its issues
        </Text>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" w="100%" gap={2} h={100}>
        <Icon as={FaHeartBroken} fontSize="4xl" color="red.600" />
        <Text fontSize="lg" color={textColor}>
          {error}
        </Text>
      </Flex>
    )
  }

  return (
    <Box p={4}>
      {/* Divide title in two parts! */}
      <HStack justifyContent="space-between" alignItems="center" mb={1}>
        {/* Board name + issue name */}
        <HStack>
          <Text as="h1" fontSize={'2xl'} fontWeight={'bold'} color={textColor}>
            {board.name}
          </Text>
          {'-'}
          <Badge colorScheme="green">{issues.length} issues</Badge>
        </HStack>
        {/* Search bar */}
        {showFilters && (
          <HStack>
            <Box>
              <SearchBar
                value={issueQueryFilter}
                isBusy={isComputingQuery || isWritingQuery}
                onSearch={(query) => {
                  setIsWritingQuery(true)
                  onQueryFilterChange(query)
                }} />
            </Box>
            <Box>
              {/* Show filters only if showFilters is true */}
              <Select
                value={issueTypeFilter || ''}
                color={textColor}
                placeholder="Filter by type"
                onChange={e => {
                  onIssueQuery(issueQueryFilter, e.target.value as IssueType)
                }}
              >
                <option value="TASK">Task</option>
                <option value="BUG">Bug</option>
                <option value="USER_STORY">User Story</option>
              </Select>
            </Box>
          </HStack>
        )}
      </HStack>
      <Divider />

      {/* Kanban columns handler*/}
      {anyIssueFound ? (
        <Box mt={2}>
          <KanbanColumns
            query={issueQueryFilter}
            issuesByStatus={issuesByStatus}
            boardSelected={board}
            onCreateIssue={onCreateIssue}
            onUpdateIssue={onIssueUpdate}
            searchHighlightEnabled={!isComputingQuery && !isWritingQuery}
            onIssueSelect={onIssueSelect}
          />
        </Box>
      ) : (
        <Flex justifyContent="center" alignItems="center" w="100%" gap={2} h={100}>
          <Icon as={FaHeartBroken} fontSize="4xl" color="red.600" />
          <Text fontSize="lg" color={textColor}>
            No issues found for query: {latestQuery}
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default KanbanBody
