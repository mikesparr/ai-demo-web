/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import LatestJobBox from '../LatestJobBox';

describe('LatestJobBox', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {

    };

    // act
    render(<LatestJobBox {...props} />);
  });
});
