/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import {
  Flex,
  Box,
  Heading,
  List,
  ListItem,
  Divider,
  Skeleton,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';

const LatestJobBox = (props) => {
  // fetch remote data
  const {data} = props;

  const latestJob = data && data.jobs && data.jobs.length > 0 ? data.jobs[0] : {
    accuracy: 0.0,
    records: 0,
    data_prep_time: 0.0,
    training_time: 0.0,
    testing_time: 0.0,
    created: null,
  };
  const prevJob = data && data.jobs && data.jobs.length > 1 ? data.jobs[1] : {
    accuracy: 0.0,
  };
  const accuracyDelta = latestJob.accuracy - prevJob.accuracy;

  return (
    <Box
      shadow="md"
      width="100%"
      border="1px gray"
      style={{
        backgroundImage: `url(${useColorModeValue('/images/target-light-blue.webp', '/images/target-dk-blue.webp')})`,
      }}
      borderRadius={10}
      p={3}
    >
      <Heading as="h3" size="md" mb={5}>Model accuracy</Heading>
      <Skeleton isLoaded={data}>
        <Flex width="100%" justify="space-between">
          <List width="100%">
            <ListItem mb={5}>
              <Stat>
                <StatLabel>Accuracy (%)</StatLabel>
                <StatNumber>{ new Intl.NumberFormat({style: 'percent'}).format(latestJob.accuracy * 100.0) }</StatNumber>
                <StatHelpText>
                  <StatArrow type={accuracyDelta >= 0 ? 'increase' : 'descrease'} />
                  { new Intl.NumberFormat({style: 'percent'}).format(accuracyDelta * 100) }
                </StatHelpText>
              </Stat>
            </ListItem>
            <ListItem mb={2}>
              <Flex justify="space-between">
                <Box fontWeight="medium">Last Job</Box>
                <Box ml={10}>{new Date(latestJob.created + 'Z').toLocaleString('en-US')}</Box>
              </Flex>
            </ListItem>
            <Divider orientation="horizontal" />
            <ListItem mb={2}>
              <Flex justify="space-between">
                <Box fontWeight="medium">Records</Box>
                <Box ml={10}>{ new Intl.NumberFormat().format(latestJob.records) }</Box>
              </Flex>
            </ListItem>
            <Divider orientation="horizontal" />
            <ListItem mb={2}>
              <Flex justify="space-between">
                <Box fontWeight="medium">Data prep seconds</Box>
                <Box ml={10}>{ new Intl.NumberFormat().format(latestJob.data_prep_time) }</Box>
              </Flex>
            </ListItem>
            <Divider orientation="horizontal" />
            <ListItem mb={2}>
              <Flex justify="space-between">
                <Box fontWeight="medium">Training seconds</Box>
                <Box ml={10}>{ new Intl.NumberFormat().format(latestJob.training_time) }</Box>
              </Flex>
            </ListItem>
            <Divider orientation="horizontal" />
            <ListItem mb={2}>
              <Flex justify="space-between">
                <Box fontWeight="medium">Testing seconds</Box>
                <Box ml={10}>{ new Intl.NumberFormat().format(latestJob.testing_time) }</Box>
              </Flex>
            </ListItem>
          </List>
        </Flex>
      </Skeleton>
    </Box>
  );
};

LatestJobBox.propTypes = {
  data: PropTypes.object,
};

export default LatestJobBox;
