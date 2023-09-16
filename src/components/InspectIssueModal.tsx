import { Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, HStack, Badge } from "@chakra-ui/react"
import { statusToString, typeToString } from "../service/issue/issue-service"
import { Issue } from "../service/issue/service"


interface InspectIssueModalProps {
  issue: Issue
  isOpen: boolean
  onClose: () => void
}

const InspectIssueModal = ({ isOpen, issue, onClose }: InspectIssueModalProps) => {
  // Modal to show issue details
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{issue.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Text fontWeight={"bold"}>Id:</Text>
            <Text>{issue.id}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={"bold"}>Status:</Text>
            <Text>{statusToString(issue.status)}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={"bold"}>Type:</Text>
            <Text>{typeToString(issue.type)}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={"bold"}>Boards:</Text>
            {issue.boards.map((board) => (
              <Badge key={board}>{board}</Badge>
            ))}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InspectIssueModal