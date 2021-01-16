/* eslint-disable react/react-in-jsx-scope */
import {screen, render} from '@testing-library/react';
import BatchStatsBar from '../components/BatchStatsBar';

describe('BatchStatsBar', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      page: 'home',
      title: 'AI Demo',
      width: '100%',
    };

    // act
    render(<BatchStatsBar {...props} />);
  });

  it('displays expected values', () => {
    // arrange
    const props = {
      submitHandler: jest.fn(),
      data: {
        batches: [
          {
            batch_id: 'xyz',
            subjects: [
              'subject-1',
              'subject-2',
              'subject-3',
            ],
            predictions: [
              'real',
              'fake',
              'real',
            ],
          },
          {
            batch_id: 'pqr',
            subjects: [
              'subject-4',
            ],
            predictions: [
              'real',
            ],
          },
        ],
      },
    };

    // act
    render(<BatchStatsBar {...props} />);
    const batchesCountNode = screen.getAllByText(/2/i);
    const predictionsCountNode = screen.getByText(/4/i);
    const realCountNode = screen.getByText(/3/i);
    const fakeCountNode = screen.getAllByText(/1/i);
    const realPercentNode = screen.getByText(/75%/i);
    const fakePercentNode = screen.getAllByText(/25%/i);

    // assert
    expect(batchesCountNode).toBeDefined();
    expect(predictionsCountNode).toBeDefined();
    expect(realCountNode).toBeDefined();
    expect(fakeCountNode).toBeDefined();
    expect(realPercentNode).toBeDefined();
    expect(fakePercentNode).toBeDefined();
  });
});
