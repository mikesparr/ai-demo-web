import { Skeleton } from "@chakra-ui/react"
import {Bar, Line} from 'react-chartjs-2';

const JobsChart = (props) => {

  // fetch remote data
  const { data } = props

  // get stats (yes redundant for this demo)
  let jobCount = 0;
  let recordCount = 0;
  let accuracy = 0.0;
  let labels = [];
  let values = [];
  let tableRows = [];

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
      <Line
        data={chartData}
        width={props.width}
        height={props.height}
        options={{
        legend: false,
        scales: {
            xAxes: [{ display: false }]
        },
        maintainAspectRatio: false
        }}
      />
    </Skeleton>
  )

}

export default JobsChart
