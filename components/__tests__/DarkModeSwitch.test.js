/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import DarkModeSwitch from '../DarkModeSwitch';

describe('DarkModeSwitch', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
    };

    // act
    render(<DarkModeSwitch {...props} />);
  });
});
