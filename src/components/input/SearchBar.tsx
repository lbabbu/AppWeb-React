import { Icon, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react'
import { FaCogs, FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  value: string
  onSearch: (query: string) => void
  isBusy?: boolean
}

const SearchBar = ({ value, isBusy, onSearch }: SearchBarProps) => {

  // Text color
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={isBusy ? <Icon as={FaCogs} color="gray.300" /> : <Icon as={FaSearch} color="gray.300" />}
      />
      <Input
        value={value}
        type="text"
        placeholder="Search"
        color={textColor}
        onChange={e => onSearch(e.target.value)}
      />
    </InputGroup>
  )
}

export default SearchBar
