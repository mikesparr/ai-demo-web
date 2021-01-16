/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import BatchReviewTable from '../components/BatchReviewTable';

describe('BatchReviewTable', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      correctionHandler: jest.fn(),
    };

    // act
    render(<BatchReviewTable {...props} />);
  });

  it('displays expected values', () => {
    // arrange
    const props = {
      correctionHandler: jest.fn(),
      data: {
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
    };

    // act
    render(<BatchReviewTable {...props} />);
  });
});
