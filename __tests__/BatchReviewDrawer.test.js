/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import BatchReviewDrawer from '../components/BatchReviewDrawer';

describe('BatchReviewDrawer', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<BatchReviewDrawer {...props} />);
  });
});
