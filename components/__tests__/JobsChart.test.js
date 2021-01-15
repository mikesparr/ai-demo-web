/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import JobsChart from '../JobsChart';

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
});
