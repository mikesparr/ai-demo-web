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
  const tableRows = []

  // get actual values from training data
  const getActualValue = (id) => {
    const foundRecord = trainingData.some((row) => {
      return row.id == id
    })

    if (foundRecord) {
      return foundRecord.class == 1 ? 'real' : 'fake'
    }
    return 'unknown'
  }

  if (data && data.predictions) {
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
                id={data.subjects[index]}
                bg={prediction == actual ? 'green.200' : 'red.200'}
                mr={3}
                size="sm"
                onChange={(e) => props.correctionHandler(e.target.id)}
                defaultValue={prediction}
              >
                <option value="real">real</option>
                <option value="fake">fake</option>
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
        <TableCaption>Incorrect rows will be RED. Correct as needed and "Save".</TableCaption>
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
