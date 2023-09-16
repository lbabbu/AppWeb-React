import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

// Define colors for light and dark mode
const textColors = {
  lightMode: baseTheme.colors.gray['800'],
  darkMode: baseTheme.colors.gray['400'],
}

const theme = extendTheme({
  colors: {
    text: textColors,
  },
})

export default theme
