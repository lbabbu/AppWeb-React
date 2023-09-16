import {
  Box,
  HStack,
  IconButton,
  Portal,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  CreateIssueInput,
  Issue,
  IssueStatus,
} from '../../service/issue/service'
import { FiPlus } from 'react-icons/fi'
import { Board } from '../../service/board/service'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableIssue from './DraggableIssue'
import { statusToString } from '../../service/issue/issue-service'
import CreateIssueModal from './CreateIssueModal'

type IssuesByStatus = {
  [key in IssueStatus]: Issue[]
}

type OnCreateIssueCallback = (board: Board, issue: CreateIssueInput) => void
type OnUpdateIssueCallback = (issueId: string, newStatus: IssueStatus) => void

interface KanbanColumnsProps {
  query: string
  boardSelected: Board | null
  issuesByStatus: IssuesByStatus
  searchHighlightEnabled?: boolean
  onCreateIssue: OnCreateIssueCallback
  onUpdateIssue: OnUpdateIssueCallback
  onIssueSelect?: (issue: Issue) => void
}

interface KanbanColumnProps {
  issues: Issue[]
  status: IssueStatus
  query: string
  boardSelected: Board | null
  issuesByStatus: IssuesByStatus
  showBoardIssues?: boolean
  searchHighlightEnabled?: boolean
  onCreateIssue: OnCreateIssueCallback
  onUpdateIssue: OnUpdateIssueCallback
  onIssueSelect?: (issue: Issue) => void
}

const KanbanColumn = ({
  issues,
  status,
  query,
  boardSelected,
  showBoardIssues = true, //if true, show issues in columns
  searchHighlightEnabled = true,
  onCreateIssue,
  onUpdateIssue,
  onIssueSelect
}: KanbanColumnProps) => {
  // Text color
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  const [{ }, drop] = useDrop(() => ({
    accept: 'issue',
    drop: (item: Issue) => {
      onUpdateIssue(item.id, status)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [status, onUpdateIssue, issues])

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minW={"200px"}>
      <HStack justifyContent="center" alignItems="center">
        <Text fontWeight="bold" fontSize="lg" color={textColor}>
          {statusToString(status)}
        </Text>
        {status === "TODO" && (
          <Tooltip label="Create a new Issue!" placement="auto-start">
            <IconButton
              px={2}
              icon={<FiPlus />}
              aria-label={'Create new Issue'}
              colorScheme="blue"
              size={'xs'}
              onClick={onOpen}
            />
          </Tooltip>
        )}
      </HStack>
      {showBoardIssues && (
        <Stack
          ref={drop}
          w="100%"
          spacing={2}
          alignItems="stretch"
          maxHeight={'calc(90vh - 200px)'}
          overflowY="auto"
          p={2}
          minHeight={'100px'}
          // Custom slim scrollbar
          css={{
            '&::-webkit-scrollbar': {
              width: '3px',
            },
            '&::-webkit-scrollbar-track': {
              width: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4299e1',
              borderRadius: '24px',
            },
          }}
        >
          {issues.map(issue => (
            <DraggableIssue
              enableHighlight={searchHighlightEnabled}
              key={issue.id}
              issue={issue}
              query={query}
              onClick={() => {
                onIssueSelect && onIssueSelect(issue)
              }}
            />
          ))}
        </Stack>
      )}

      <Portal>
        <CreateIssueModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={(title) => {
            onCreateIssue(boardSelected!, {
              title
            })
          }}
        />
      </Portal>
    </Box>
  )
}

const KanbanColumns = ({
  issuesByStatus,
  query,
  boardSelected,
  searchHighlightEnabled,
  onCreateIssue,
  onUpdateIssue,
  onIssueSelect,
}: KanbanColumnsProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        w="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        {/* Display a column for each status */}
        {Object.keys(issuesByStatus).map(status => (
          <KanbanColumn
            query={query}
            key={status}
            issues={issuesByStatus[status as IssueStatus]}
            status={status as IssueStatus}
            searchHighlightEnabled={searchHighlightEnabled}
            boardSelected={boardSelected}
            onCreateIssue={onCreateIssue}
            issuesByStatus={issuesByStatus}
            onUpdateIssue={onUpdateIssue}
            onIssueSelect={onIssueSelect}
          />
        ))}
      </Box>
    </DndProvider>
  )
}

export default KanbanColumns
