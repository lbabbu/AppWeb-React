import { Text, HStack, useColorModeValue } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../input/ColorModeSwitcher"

const Navbar = () => {

  // Color mode for navbar
  const boxColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  return (
    <HStack
      backgroundColor={boxColor}
      color={'gray.600'}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
      height={'60px'}

      alignItems={'center'}
      justifyContent={'space-between'}

      // Sticky navbar (attached to top)
      position={'sticky'}
      top={0}
      zIndex={1}
    >
      <Text
        textAlign="left"
        fontFamily={'heading'}
        color={textColor}
        fontWeight={700}
      >
        Group 03 - Kanban Board
      </Text>

      <ColorModeSwitcher justifySelf="flex-end" />
    </HStack>
  )
}

export default Navbar