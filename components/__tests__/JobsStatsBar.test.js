/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import JobsStatsBar from '../JobsStatsBar';

describe('JobsStatsBar', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {

    };

    // act
    render(<JobsStatsBar {...props} />);
  });
});
