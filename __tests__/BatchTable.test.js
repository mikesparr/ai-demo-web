/* eslint-disable react/react-in-jsx-scope */
import {screen, render} from '@testing-library/react';
import BatchTable from '../components/BatchTable';

describe('BatchTable', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<BatchTable {...props} />);
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
    render(<BatchTable {...props} />);
    const predictionsCountNode = screen.getByText(/3/i);
    const realCountNode = screen.getByText(/2/i);
    const fakeCountNode = screen.getAllByText(/1/i);

    // assert
    expect(predictionsCountNode).toBeDefined();
    expect(realCountNode).toBeDefined();
    expect(fakeCountNode).toHaveLength(4);
  });
});
