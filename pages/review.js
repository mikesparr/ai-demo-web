/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import {
  Heading,
  Flex,
  Box,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import Feature from '../components/Feature';
import BatchStatsBar from '../components/BatchStatsBar';
import BatchesTable from '../components/BatchTable';

import {submitCorrectedBatch} from '../lib/batch';

import useSWR from 'swr';

const {publicRuntimeConfig} = getConfig();
const apiUrl = publicRuntimeConfig.predictUrl;
const fetcher = (url) => fetch(url).then((res) => res.json());

const Review = (props) => {
  // fetch remote data
  // eslint-disable-next-line max-len
  const {data: batches, error} = useSWR(apiUrl + '/batches', fetcher, props.data);

  // new corrections
  const toast = useToast();

  const handleReviewSubmit = async (batch) => {
    console.log('Submitting corrections for batch', batch.batch_id);

    let status = 'success';
    const toastMessage = {
      success: {
        title: 'Corrections submitted.',
        description: 'Your corrections were submitted for retraining.',
        status: 'success',
        duration: 2000,
      },
      error: {
        status: 'error',
        title: 'Request failed',
        description: 'There was an error submitting your corrections.',
        duration: 3000,
      },
    };

    try {
      console.log({batch});
      const resp = await submitCorrectedBatch(apiUrl, batch);
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
    <Layout page="review" error={error}>

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
        >Review</Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          width="80%"
          p={3}
        >
          <BatchStatsBar data={batches} />
        </Box>
      </Flex>

      <Flex
        p="1.0rem"
        width="100%"
      >
        <Feature
          title="Prediction Review"
          desc={`Review batches and submit corrections if necessary. Corrections
          will automatically trigger machine learning model retraining jobs.`}
          borderRadius={10}
          width="100%"
          backgroundColor={useColorModeValue('orange.50', 'blue.900')}
        />
      </Flex>

      <Flex
        direction="column"
        width="100%"
        p="1.0rem"
      >
        <BatchesTable data={batches} submitHandler={ handleReviewSubmit } />
      </Flex>

    </Layout>
  );
};

// preload data server side, then useSWR for client-side refreshing
export const getServerSideProps = async () => {
  // fetch data
  const res = await fetch(apiUrl + '/batches');
  const data = await res.json();

  // pass data
  return {props: {data}};
};

Review.propTypes = {
  data: PropTypes.object,
};

export default Review;
