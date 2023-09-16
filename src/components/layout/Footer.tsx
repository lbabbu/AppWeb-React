import { Text, Box, useColorModeValue } from "@chakra-ui/react"

const Footer = () => {
  // Define colors
  const boxColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('text.lightMode', 'text.darkMode')

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      textAlign={'center'}
      fontSize={'sm'}
      height={'60px'}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      backgroundColor={boxColor}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
      justifyContent={'center'}

      // Sticky footer (attached to bottom)
      position={'fixed'}
      zIndex={1}
      bottom={0}
      left={0}
      right={0}
    >
      <Text fontWeight={700} fontSize={'sm'} color={textColor}>
        Made with ❤️ by Luca Di Bello & Leonardo Babbucci
      </Text>
    </Box>
  )
}

export default Footer