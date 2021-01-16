/* eslint-disable react/react-in-jsx-scope */
import {screen, render} from '@testing-library/react';
import LatestJobBox from '../components/LatestJobBox';

describe('LatestJobBox', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {

    };

    // act
    render(<LatestJobBox {...props} />);
  });

  it('displays expected values', () => {
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
    };

    // act
    render(<LatestJobBox {...props} />);
    const recordCountNode = screen.getByText(/10/i);
    const dataPrepNode = screen.getByText(/0.01/i);
    const trainingTimeNode = screen.getByText(/0.02/i);
    const testingTimeNode = screen.getByText(/0.03/i);
    const accuracyNode = screen.getAllByText(/93/i);

    // assert
    expect(recordCountNode).toBeDefined();
    expect(dataPrepNode).toBeDefined();
    expect(trainingTimeNode).toBeDefined();
    expect(testingTimeNode).toBeDefined();
    expect(accuracyNode).toHaveLength(2);
  });
});
