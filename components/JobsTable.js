import { Skeleton, Table, TableCaption, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react"

const JobsTable = (props) => {

  const { data } = props

  // get stats (yes redundant for this demo)
  let jobCount = 0;
  let values = [];
  let tableRows = [];

  if (data && data.jobs) {
    jobCount = data.jobs.length;
    data.jobs.map((job, i) => {
      values.push(job.accuracy * 100)
      tableRows.push(
        <Tr key={job.job_id}>
          <Td>{new Date(job.created + 'Z').toLocaleString("en-US")}</Td>
          <Td isNumeric>{new Intl.NumberFormat().format(job.records)}</Td>
          <Td isNumeric>{new Intl.NumberFormat().format(job.data_prep_time)}</Td>
          <Td isNumeric>{new Intl.NumberFormat().format(job.training_time)}</Td>
          <Td isNumeric>{new Intl.NumberFormat().format(job.testing_time)}</Td>
          <Td isNumeric>{new Intl.NumberFormat().format(job.accuracy * 100.0)}</Td>
        </Tr>
      )
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
  )
}

export default JobsTable
