/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import {
  SimpleGrid,
  Flex,
  Box,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import Feature from '../components/Feature';
import JobsChart from '../components/JobsChart';
import LatestJobBox from '../components/LatestJobBox';
import BatchStatsBar from '../components/BatchStatsBar';
import NewBatchPopover from '../components/NewBatchPopover';

import {newBatch, newRequest, submitBatch} from '../lib/batch';

import useSWR from 'swr';

const {publicRuntimeConfig} = getConfig();
const predictUrl = publicRuntimeConfig.predictUrl;
const ingestUrl = publicRuntimeConfig.ingestUrl;
const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = (props) => {
  // fetch remote data
  // eslint-disable-next-line max-len
  const {data: jobs, jobsError} = useSWR(predictUrl + '/jobs', fetcher, props.data.jobs);
  // eslint-disable-next-line max-len
  const {data: batches, batchError} = useSWR(predictUrl + '/batches', fetcher, props.data.batches);
  const error = jobsError || batchError;

  // new batch
  const toast = useToast();

  const handleBatchSubmit = async (size) => {
    console.log('Submitting batch size', size);
    const recs = newBatch(size);
    const req = newRequest(recs);

    let status = 'success';
    const toastMessage = {
      success: {
        status: 'success',
        title: 'Batch submitted',
        description: 'Your batch was submitted for prediction',
        duration: 2000,
      },
      error: {
        status: 'error',
        title: 'Request failed',
        description: 'There was an error submitting your batch',
        duration: 3000,
      },
    };

    try {
      console.log({req});
      const resp = await submitBatch(ingestUrl, req);
      console.log({resp});

      if (resp && resp.message) {
        status = 'error';
        toastMessage.error.description = resp.message;
      }
    } catch (err) {
      console.log({err});
      status = 'error';
      toastMessage.error.description = err.message;
    }

    toast({
      position: 'top',
      ...toastMessage[status],
      isClosable: true,
    });
  };

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
          <BatchStatsBar data={batches}>{<NewBatchPopover
            submitHandler={ handleBatchSubmit }
          />}</BatchStatsBar>
        </Box>
      </Flex>

      <SimpleGrid width="100%" spacing={20} gap={3} p="1.0rem" columns={2}>
        <Box shadow="md" border="1px gray" borderRadius={10} p={3}>
          <JobsChart width={700} height={300} color="blue" data={jobs} />
        </Box>

        <LatestJobBox data={jobs} />
      </SimpleGrid>

      <Flex
        p="1.0rem"
        width="100%"
      >
        <Feature
          title="Welcome"
          desc={`This site is designed to demonstrate an automatic feedback 
          loop for machine learning. Create New Batches, then correct them 
          in the Review page and witness model accuracy change as more 
          training data is available.`}
          borderRadius={10}
          width="100%"
          backgroundColor={useColorModeValue('orange.50', 'blue.900')}
        />
      </Flex>

    </Layout>
  );
};

// preload data server side, then useSWR for client-side refreshing
export const getServerSideProps = async () => {
  // fetch data
  const batchRes = await fetch(predictUrl + '/batches');
  const batchData = await batchRes.json();
  const jobsRes = await fetch(predictUrl + '/jobs');
  const jobsData = await jobsRes.json();

  // pass data
  return {
    props: {
      data: {
        batches: batchData,
        jobs: jobsData,
      },
    },
  };
};

Home.propTypes = {
  data: PropTypes.object,
};

export default Home;
