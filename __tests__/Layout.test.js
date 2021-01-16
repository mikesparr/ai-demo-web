/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import Layout from '../components/Layout';

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
