/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import BatchTable from '../BatchTable';

describe('BatchTable', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<BatchTable {...props} />);
  });
});
