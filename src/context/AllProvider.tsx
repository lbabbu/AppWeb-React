import { ChakraProvider } from "@chakra-ui/react"
import theme from "../util/buildTheme"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

export default AllProviders