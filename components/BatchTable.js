/* eslint-disable react/react-in-jsx-scope */
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
import BatchReviewDrawer from './BatchReviewDrawer';

const BatchTable = (props) => {
  // fetch remote data
  const {data} = props;

  // get stats (yes redundant for this demo)
  const tableRows = [];

  if (data && data.batches) {
    data.batches.map(({batch_id: batchId, subjects, predictions, created}) => {
      if (predictions && predictions.length) {
        const batch = {batchId, subjects, predictions, created};
        let batchRealCount = 0;

        // loop through predictions and increment 'real' and 'fake' counts
        predictions.map((prediction) => {
          if (prediction == 'real') {
            batchRealCount++;
          }
        });

        tableRows.push(
            <Tr key={batchId}>
              <Td>{new Date(created + 'Z').toLocaleString('en-US')}</Td>
              <Td isNumeric>{predictions.length}</Td>
              <Td isNumeric>{batchRealCount}</Td>
              <Td isNumeric>{predictions.length - batchRealCount}</Td>
              <Td isNumeric p={1}>
                <BatchReviewDrawer
                  data={batch}
                  submitHandler={props.submitHandler}
                />
              </Td>
            </Tr>,
        );
      }
    });
  }

  return (
    <Skeleton isLoaded={data}>
      <Table variant="striped" colorScheme="blue" width="100%">
        <TableCaption>
          Display the most recent batches (up to 100).
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Submitted</Th>
            <Th isNumeric>Predictions</Th>
            <Th isNumeric>Real</Th>
            <Th isNumeric>Fake</Th>
            <Th isNumeric>&nbsp;</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableRows}
        </Tbody>
      </Table>
    </Skeleton>
  );
};

BatchTable.propTypes = {
  data: PropTypes.object,
  submitHandler: PropTypes.func.isRequired,
};

export default BatchTable;
