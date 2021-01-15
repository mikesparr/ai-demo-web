/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      page: 'Home',
      width: '100%',
    };

    // act
    render(<Footer {...props} />);
  });
});
