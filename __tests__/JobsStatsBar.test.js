/* eslint-disable react/react-in-jsx-scope */
import {screen, render} from '@testing-library/react';
import JobsStatsBar from '../components/JobsStatsBar';

describe('JobsStatsBar', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {

    };

    // act
    render(<JobsStatsBar {...props} />);
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
    render(<JobsStatsBar {...props} />);
    const recordCountNode = screen.getByText(/10/i);
    const accuracyNode = screen.getAllByText(/93/i);

    // assert
    expect(recordCountNode).toBeDefined();
    expect(accuracyNode).toHaveLength(2);
  });
});
