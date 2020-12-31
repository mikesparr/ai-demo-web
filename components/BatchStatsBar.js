import { AddIcon } from "@chakra-ui/icons"
import { Skeleton, Button } from "@chakra-ui/react"
import { StatGroup, Stat, StatLabel, StatHelpText, StatNumber } from '@chakra-ui/react'
import { Doughnut } from 'react-chartjs-2';

// pass an error handler function so child can send errors back to parent
const BatchStatsBar = (props) => {

  // fetch remote data
  const { data } = props;

  // get stats (yes redundant for this demo)
  let batchCount = 0;
  let predictionCount = 0;
  let realCount = 0;

  if (data && data.batches) {
    batchCount = data.batches.length;
    data.batches.map(({batch_id, subjects, predictions}) => {
      if (predictions && predictions.length) {
        predictionCount += predictions.length;
        // loop through predictions and increment 'real' and 'fake' counts
        predictions.map((prediction) => {
          if (prediction == 'real') {
            realCount++;
          }
        });
      }
    });
  } // else (no data found)

  const chartData = {
    datasets: [{
      backgroundColor: ["yellowgreen", "#F36F53"],
      borderColor: 'gray',
      borderWidth: 1,
      data: [63, 26]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Real',
      'Fake'
    ]
  };

  return (
    <Skeleton isLoaded={data}>
    <StatGroup>
      <Stat>
        <StatLabel>Batches</StatLabel>
          <StatNumber>{ new Intl.NumberFormat().format(batchCount) }</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Predictions</StatLabel>
          <StatNumber>{ new Intl.NumberFormat().format(predictionCount) }</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Real</StatLabel>
          <StatNumber color="yellowgreen">{ new Intl.NumberFormat().format(realCount) }</StatNumber>
          <StatHelpText>
          { new Intl.NumberFormat().format((realCount / predictionCount) * 100) }%
          </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Fake</StatLabel>
          <StatNumber color="red.300">{ new Intl.NumberFormat().format(predictionCount - realCount) }</StatNumber>
          <StatHelpText>
          { new Intl.NumberFormat().format(((predictionCount - realCount) / predictionCount) * 100) }%
          </StatHelpText>
      </Stat>

      <Stat>
        <Doughnut
          data={chartData}
          height={80}
          width={80}
          options={{
            legend: false,
            scales: {
              xAxes: [{ display: false }]
            },
            maintainAspectRatio: false
          }}
        />
      </Stat>
      
      {props && props.actionButton &&
        <Stat>
          <StatLabel>&nbsp;</StatLabel>
          <Button leftIcon={<AddIcon />} colorScheme="blue" ml={20}>
            New Batch
          </Button>
        </Stat>
      }

    </StatGroup>
    </Skeleton>
  )

}

export default BatchStatsBar
