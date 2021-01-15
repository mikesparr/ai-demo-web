/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import BatchStatsBar from '../BatchStatsBar';

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
});
