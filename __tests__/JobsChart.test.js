/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import JobsChart from '../components/JobsChart';

describe('JobsChart', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      width: 700,
      height: 300,
    };

    // act
    render(<JobsChart {...props} />);
  });

  it('displays expected components', () => {
    // arrange
    const props = {
      data: {
        jobs: [
          {
            job_id: 'abc',
            accuracy: 0.93,
            records: 10,
            data_prep_time: 0.01,
            training_time: 0.02,
            testing_time: 0.03,
          },
        ],
      },
      width: 700,
      height: 300,
    };

    // act
    render(<JobsChart {...props} />);
  });
});
