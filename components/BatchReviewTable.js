import {
  Skeleton, 
  Table, 
  TableCaption, 
  Thead, 
  Tbody, 
  Th, 
  Tr, 
  Td,
  Badge,
  Select
} from "@chakra-ui/react"
import { trainingData } from "../lib/batch"

const BatchReviewTable = (props) => {

  const { data } = props
  let predictionCount = 0
  const tableRows = []

  // get actual values from training data
  const getActualValue = (id) => {
    let val = ''
    trainingData.map((row) => {
      if (row.id == id) {
        val = row.class == 1 ? 'real' : 'fake'
      }
    })
    return val
  }

  if (data && data.predictions) {
    predictionCount = data.predictions.length;
    data.predictions.map((prediction, index) => {
      if (prediction) {
        const actual = getActualValue(data.subjects[index])
        // console.log({actual, prediction})
        
        tableRows.push(
          <Tr key={index}>
            <Td p={2}>{data.subjects[index]}</Td>
            <Td textAlign="center" p={2}>
              <Badge colorScheme={prediction == 'real' ? 'green' : 'red'}>{prediction}</Badge>
            </Td>
            <Td textAlign="center" p={1}>
              <Select
                bg={prediction == actual ? 'green.200' : 'red.200'}
                mr={3}
                size="sm"
                onChange={(e) => props.correctionHandler(e.target.value)}
              >
                <option value={data.subjects[index]} selected={actual == 'real' ? 'true' : ''}>real</option>
                <option value={data.subjects[index]} selected={actual == 'fake' ? 'true' : ''}>fake</option>
              </Select>
            </Td>
          </Tr>
        )
      }
    });
  }
  
  return (
    <>
    <Skeleton isLoaded={data}>
      <Table variant="striped" colorScheme="blue" width="100%">
        <TableCaption>Incorrect rows will be highlighted. Correct all and "Save".</TableCaption>
        <Thead>
          <Tr>
            <Th>Subject</Th>
            <Th isNumeric>Prediction</Th>
            <Th isNumeric>Actual</Th>
          </Tr>
        </Thead>
        <Tbody>
        {tableRows}
        </Tbody>
      </Table>
    </Skeleton>
    </>
  )
}

export default BatchReviewTable
