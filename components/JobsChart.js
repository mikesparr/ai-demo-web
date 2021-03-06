/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import {Skeleton} from '@chakra-ui/react';
import {Bar} from 'react-chartjs-2';

const JobsChart = (props) => {
  // fetch remote data
  const {data} = props;

  // get stats (yes redundant for this demo)
  let recordCount = 0;
  let accuracy = 0.0;
  const labels = [];
  const values = [];

  if (data && data.jobs) {
    data.jobs.map((job, i) => {
      accuracy = accuracy == 0.0 ? job.accuracy : accuracy;
      recordCount = recordCount == 0 ? job.records : recordCount;
      labels.push(`Model: ${job.model_file_name}`);
      values.push(job.accuracy * 100.0);
    });
  }
  const sortedValues = [...values].reverse();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Accuracy',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: sortedValues,
      },
    ],
  };

  return (
    <Skeleton isLoaded={data}>
      <Bar
        data={chartData}
        width={props.width}
        height={props.height}
        options={{
          legend: false,
          scales: {
            xAxes: [{display: false}],
          },
          maintainAspectRatio: false,
        }}
      />
    </Skeleton>
  );
};

JobsChart.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default JobsChart;
