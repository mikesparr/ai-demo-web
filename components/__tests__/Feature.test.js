/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import Feature from '../Feature';

describe('Feature', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      title: 'Title',
      desc: 'Test text',
    };

    // act
    render(<Feature {...props} />);
  });
});
