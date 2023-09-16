import { Box, Text, Button, VStack, useColorModeValue, HStack, Icon } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'
import { Board } from '../../service/board/service'

interface BoardSelectorProps {
  selectedBoard: Board | null
  boards: Board[]
  error: string | null
  onBoardSelected?: (board: Board) => void
}

const BoardSelector = ({
  selectedBoard,
  boards,
  error,
  onBoardSelected,
}: BoardSelectorProps) => {
  // Text color
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  return (
    <Box p={3} mb={'120px'} height={'80vh'}>
      <Text fontWeight={'bold'} color={textColor}>Boards</Text>

      {!error ? (
        <VStack mt={2}>
          {boards.map(board => (
            <Button
              key={board.id}
              colorScheme={selectedBoard?.id === board.id ? 'facebook' : 'gray'}
              onClick={() => onBoardSelected && onBoardSelected(board)}
            >
              {board.name}
            </Button>
          ))}
        </VStack>
      ) : (
        <HStack>
          <Icon as={FiX} color="red" />
          <Text color={textColor}>{error}</Text>
        </HStack>
      )}
    </Box>
  )
}

export default BoardSelector
