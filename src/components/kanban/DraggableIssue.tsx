import { useDrag } from 'react-dnd'
import {
  Box,
  Highlight,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Issue, IssueType } from '../../service/issue/service'

const getBorderColor = (issueType: IssueType) => {
  switch (issueType) {
    case 'TASK':
      return 'green.500'
    case 'BUG':
      return 'red.500'
    case 'USER_STORY':
      return 'blue.500'
    default:
      return 'gray.500'
  }
}

interface DraggableIssueProps {
  issue: Issue
  query: string
  enableHighlight?: boolean
  onClick?: () => void
}

const DraggableIssue = ({ issue, query, enableHighlight, onClick }: DraggableIssueProps) => {

  // Define text color
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'issue',
    item: issue,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <Box
      ref={drag}
      key={issue.id}
      w="100%"
      p={2}
      borderWidth="2px"
      borderRadius="md"
      position="relative"
      opacity={isDragging ? 0.5 : 1}
      onClick={() => onClick && onClick()}
      cursor="pointer"
    >
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        width="5px"
        backgroundColor={getBorderColor(issue.type)}
      />
      <Text fontWeight="bold" fontSize="md" color={textColor}>
        <Highlight
          query={enableHighlight ? query : ''}
          styles={{ px: '1', py: '1', bg: 'orange.100' }}
        >
          {issue.title}
        </Highlight>
      </Text>
    </Box>
  )
}

export default DraggableIssue
