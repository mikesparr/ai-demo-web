import Head from 'next/head'
import { Flex, Stack } from '@chakra-ui/react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const width = "1100px"

export default function Layout({ children, page, error }) {

  const alert = (error) => {
    if (error) return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    );
  }

  return (
    <Stack
      as="main"
      align="center"
    >
      <Head>
        <title>Bank Note Demo - {page.toUpperCase()}</title>
        <meta name="description" content="Machine learning demo app with automated retraining jobs using bank note dataset."/>
      </Head>

      <Navbar width="100%" title="Bank Note Demo" page={page || "home"} />

      <Flex width={width}>
        {alert(error)}
      </Flex>

      <Stack width={width}>
        {children}
      </Stack>
      
      <Footer width={width} page={page} />
    </Stack>
  )
}