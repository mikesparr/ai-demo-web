/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  Skeleton,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';

const JobsTable = (props) => {
  const {data} = props;

  // get stats (yes redundant for this demo)
  const tableRows = [];

  if (data && data.jobs) {
    data.jobs.map((job, i) => {
      tableRows.push(
          <Tr key={job.job_id}>
            <Td>{new Date(job.created + 'Z').toLocaleString('en-US')}</Td>
            <Td isNumeric>{new Intl.NumberFormat().format(job.records)}</Td>
            <Td isNumeric>{new Intl.NumberFormat().format(job.data_prep_time)}</Td>
            <Td isNumeric>{new Intl.NumberFormat().format(job.training_time)}</Td>
            <Td isNumeric>{new Intl.NumberFormat().format(job.testing_time)}</Td>
            <Td isNumeric>{new Intl.NumberFormat().format(job.accuracy * 100.0)}</Td>
          </Tr>,
      );
    });
  }

  return (
    <Skeleton isLoaded={data}>
      <Table variant="striped" colorScheme="blue" width="100%">
        <TableCaption>Display the most recent jobs (up to 25).</TableCaption>
        <Thead>
          <Tr>
            <Th>Completed</Th>
            <Th isNumeric>Records</Th>
            <Th isNumeric>Prep Time</Th>
            <Th isNumeric>Training Time</Th>
            <Th isNumeric>Testing Time</Th>
            <Th isNumeric>Accuracy (%)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableRows}
        </Tbody>
      </Table>
    </Skeleton>
  );
};

JobsTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default JobsTable;
