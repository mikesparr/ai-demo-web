/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import Layout from '../Layout';

describe('Layout', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      page: 'Home',
    };

    // act
    render(<Layout {...props} />);
  });
});
