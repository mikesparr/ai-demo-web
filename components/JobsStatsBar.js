import { Skeleton } from "@chakra-ui/react"
import { StatGroup, Stat, StatLabel, StatHelpText, StatNumber, StatArrow } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2';

// pass an error handler function so child can send errors back to parent
const JobsStatsBar = (props) => {

  // fetch remote data
  const { data } = props

  // get stats (yes redundant for this demo)
  let jobCount = 0;
  let recordCount = 0;
  let accuracy = 0.0;
  let labels = [];
  let values = [];

  if (data && data.jobs) {
    jobCount = data.jobs.length;
    data.jobs.map((job, i) => {
      accuracy = accuracy == 0.0 ? job.accuracy : accuracy;
      recordCount = recordCount == 0 ? job.records : recordCount;
      labels.push(i + 1)
      values.push(job.accuracy * 100)
    });
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Accuracy",
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: values.reverse()
      }
    ]
  };

  return (
    <Skeleton isLoaded={data}>
    <StatGroup>
      <Stat>
        <StatLabel>Jobs</StatLabel>
          <StatNumber>{ new Intl.NumberFormat().format(jobCount) }</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Records</StatLabel>
          <StatNumber>{ new Intl.NumberFormat({ style: 'percent' }).format(recordCount) }</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Accuracy (%)</StatLabel>
          <StatNumber>{ new Intl.NumberFormat({ style: 'percent' }).format(accuracy * 100) }</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          4.762
        </StatHelpText>
      </Stat>
      <Stat>
        <Line
          data={chartData}
          width={120}
          height={80}
          options={{
            legend: false,
            scales: {
              xAxes: [{ display: false }]
            },
            maintainAspectRatio: false
          }}
        />
      </Stat>
    </StatGroup>
    </Skeleton>
  )

}

export default JobsStatsBar
