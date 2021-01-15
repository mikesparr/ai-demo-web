/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import BatchReviewTable from '../BatchReviewTable';

describe('BatchReviewTable', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      correctionHandler: jest.fn(),
    };

    // act
    render(<BatchReviewTable {...props} />);
  });
});
