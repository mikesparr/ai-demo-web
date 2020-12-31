import getConfig from 'next/config'
import { SimpleGrid, Flex, Box } from '@chakra-ui/react'
import Layout from "../components/Layout"
import Feature from "../components/Feature"
import JobsChart from "../components/JobsChart"
import BatchStatsBar from "../components/BatchStatsBar"

import useSWR from 'swr'

const { publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.apiUrl
const fetcher = url => fetch(url).then(res => res.json());

const Home = (props) => {

  // fetch remote data
  const { data: jobs, jobsError } = useSWR(apiUrl + '/jobs', fetcher, props.data.jobs);
  const { data: batches, batchError } = useSWR(apiUrl + '/batches', fetcher, props.data.batches);
  const error = jobsError || batchError;

  // handler
  const handleNewBatch = (...args) => {
    alert(...args)
  }

  return (
    <Layout page="home" error={error}>
      
      <Flex
        justify="space-between"
        p="1.0rem"
        width="100%"
      >
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          width="100%"
          p={3}
        >
          <BatchStatsBar data={batches} actionButton={true} />
        </Box>
      </Flex>

      <SimpleGrid width="100%" spacing={20} gap={3} p="1.0rem" columns={2}>
          <Box shadow="md" border="1px gray" borderRadius={10} p={3}>
            <JobsChart width={700} height={300} color="blue" data={jobs} />
          </Box>

          <Feature
            title="Welcome"
            desc="This site is designed to demonstrate an automatic feedback loop for machine learning. Create New Batches, then correct them in the Review page and witness model accuracy increase as more training data is available."
            borderRadius={10}
          />
      </SimpleGrid> 

    </Layout>
  )
}

// preload data server side, then useSWR for client-side refreshing
export async function getServerSideProps() {
  // fetch data
  const batchRes = await fetch(apiUrl + '/batches')
  const batchData = await batchRes.json()
  const jobsRes = await fetch(apiUrl + '/jobs')
  const jobsData = await jobsRes.json()

  // pass data
  return { 
    props: { 
      data: {
        batches: batchData,
        jobs: jobsData,
      }
    } 
  }
}

export default Home
