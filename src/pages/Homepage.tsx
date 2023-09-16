import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { Box, Button, HStack, Icon, Portal, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import KanbanPreviewCarousel, { KanbanPreview } from '../components/KanbanPreviewCarousel'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Issue } from '../service/issue/service'
import InspectIssueModal from '../components/InspectIssueModal'

const Homepage = () => {
  // Carousel index
  const [index, setIndex] = useState<number>(0)
  const [currentPreview, setCurrentPreview] = useState<KanbanPreview>(previews[index])

  // Selected issues + modal state
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()


  // Text color
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')
  const background = useColorModeValue('gray.100', 'gray.900')

  return (
    <Box maxH={'100vh'}>
      <Navbar />

      {/* Controls */}
      <HStack backgroundColor={background} px={4} py={1}>
        <Text color={textColor}>Component preview {index + 1}/{previews.length}</Text>
        {/* Previous button */}
        <Button
          aria-label='Next preview'
          onClick={() => setIndex(index - 1)}
          leftIcon={<Icon as={FaChevronLeft} />}
          isDisabled={index === 0}
          size={'xs'}
        >
          Previous board
        </Button>

        {/* Next button */}
        <Button
          aria-label='Next preview'
          onClick={() => setIndex(index + 1)}
          rightIcon={<Icon as={FaChevronRight} />}
          isDisabled={index === previews.length - 1}
          size={'xs'}
        >
          Next board
        </Button>

        {/* Current board title */}
        <Box flex={1} textAlign={'right'}>
          <Text color={textColor} fontWeight="bold">Name: {currentPreview.title}</Text>
        </Box>
      </HStack>


      {/* First board (API + All enabled) */}
      <KanbanPreviewCarousel
        index={index}
        onPreviewChange={(preview) => setCurrentPreview(preview)}
        previews={previews}
        onBoardSelected={(board) => {
          console.log("Selected board: ", board)
        }}
        onIssueSelected={(issue) => {
          setSelectedIssue(issue)
          onOpen()
        }}
      />

      <Footer />

      {selectedIssue && (
        <Portal>
          {/* Issue modal */}
          <InspectIssueModal
            isOpen={isOpen}
            onClose={onClose}
            issue={selectedIssue}
          />
        </Portal>
      )}
    </Box>
  )
}

const previews = [
  {
    title: 'API + All enabled',
    settings: {
      isApi: true,
      displaySettings: {
        showFilters: true,
        showBoardSelector: true,
      }
    }
  },
  {
    title: 'API + Filters disabled',
    settings: {
      isApi: true,
      displaySettings: {
        showFilters: false,
        showBoardSelector: true,
      }
    }
  },
  {
    title: 'API + Board selector disabled',
    settings: {
      isApi: true,
      displaySettings: {
        showFilters: true,
        showBoardSelector: false,
      }
    }
  },
  {
    title: 'API + All disabled',
    settings: {
      isApi: true,
      displaySettings: {
        showFilters: false,
        showBoardSelector: false,
      }
    }
  },
  {
    title: 'Local storage + All enabled',
    settings: {
      isApi: false,
      displaySettings: {
        showFilters: true,
        showBoardSelector: true,
      }
    }
  },
  {
    title: 'Local storage + Filters disabled',
    settings: {
      isApi: false,
      displaySettings: {
        showFilters: false,
        showBoardSelector: true,
      }
    }
  },
  {
    title: 'Local storage + Board selector disabled',
    settings: {
      isApi: false,
      displaySettings: {
        showFilters: true,
        showBoardSelector: false,
      }
    }
  },
  {
    title: 'Local storage + All disabled',
    settings: {
      isApi: false,
      displaySettings: {
        showFilters: false,
        showBoardSelector: false,
      },
    }
  }
]

export default Homepage
