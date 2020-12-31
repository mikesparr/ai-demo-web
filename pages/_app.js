import { SWRConfig } from "swr"
import { ChakraProvider } from "@chakra-ui/react"
import customTheme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 2500,
        fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  )
}

export default MyApp
