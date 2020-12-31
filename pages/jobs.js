import getConfig from 'next/config'
import { useColorModeValue, Heading, Flex, Box } from '@chakra-ui/react'
import Layout from "../components/Layout"
import Feature from "../components/Feature"
import JobsStatsBar from "../components/JobsStatsBar"
import JobsTable from '../components/JobsTable'

import useSWR from 'swr'

const { publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.apiUrl
const fetcher = url => fetch(url).then(res => res.json());

const Jobs = (props) => {

  // fetch remote data
  const { data: jobs, error } = useSWR(apiUrl + '/jobs', fetcher, props.data);

  return (
    <Layout page="jobs" error={error}>

      <Flex
        justify="space-between"
        p="1.5rem"
        width="100%"
      >
        <Heading
            as="h1"
            size="xl"
            fontWeight="normal"
            p={5}
          >Jobs</Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          width="80%"
          p={3}
        >
          <JobsStatsBar data={jobs} />
        </Box>
      </Flex>

      <Flex
        p="1.0rem"
        width="100%"
      >
          <Feature
            title="Training Jobs"
            desc="User corrections will trigger model retraining and subsequent batches will use the revised model for predictions."
            borderRadius={10}
            width="100%"
            backgroundColor={useColorModeValue("orange.50", "blue.900")}
          />
      </Flex>

      <Flex
        direction="column"
        width="100%"
        p="1.0rem"
      >
        <JobsTable data={jobs} />
      </Flex>

    </Layout>
  )
}

// preload data server side, then useSWR for client-side refreshing
export async function getServerSideProps() {
  // fetch data
  const res = await fetch(apiUrl + '/jobs')
  const data = await res.json()

  // pass data
  return { props: { data } }
}

export default Jobs
