import { useState } from 'react'
import { Input, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

interface CreateIssueModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string) => void
}

const CreateIssueModal = ({ isOpen, onClose, onSubmit }: CreateIssueModalProps) => {
  const [title, setTitle] = useState<string>('')

  return (
    <Modal isOpen={isOpen} onClose={onClose} returnFocusOnClose={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new issue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isDisabled={title.length === 0}
            onClick={() => {
              onSubmit(title)
              setTitle('')
              onClose()
            }}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateIssueModal
