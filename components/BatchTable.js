import { Skeleton, Table, TableCaption, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react"

const BatchTable = (props) => {

  // fetch remote data
  const { data } = props

  // get stats (yes redundant for this demo)
  let batchCount = 0;
  let predictionCount = 0;
  let realCount = 0;
  let tableRows = [];

  if (data && data.batches) {
    batchCount = data.batches.length;
    data.batches.map(({batch_id, subjects, predictions, created}) => {
      if (predictions && predictions.length) {
        const batch = {batch_id, subjects, predictions, created}
        predictionCount += predictions.length;
        let batchRealCount = 0;
  
        // loop through predictions and increment 'real' and 'fake' counts
        predictions.map((prediction) => {
          if (prediction == 'real') {
            realCount++;
            batchRealCount++;
          }
        });
  
        tableRows.push(
          <Tr key={batch_id}>
            <Td>{new Date(created + 'Z').toLocaleString("en-US")}</Td>
            <Td isNumeric>{predictions.length}</Td>
            <Td isNumeric>{batchRealCount}</Td>
            <Td isNumeric>{predictions.length - batchRealCount}</Td>
            <Td isNumeric></Td>
          </Tr>
        )
      }
    });
  }

  return (
    <Skeleton isLoaded={data}>
      <Table variant="striped" colorScheme="blue" width="100%">
        <TableCaption>Data will reset periodically for this demo.</TableCaption>
        <Thead>
          <Tr>
            <Th>Submitted</Th>
            <Th isNumeric>Predictions</Th>
            <Th isNumeric>Real</Th>
            <Th isNumeric>Fake</Th>
            <Th isNumeric>Review</Th>
          </Tr>
        </Thead>
        <Tbody>
        {tableRows}
        </Tbody>
      </Table>
    </Skeleton>
  )
}

export default BatchTable
