/* eslint-disable react/react-in-jsx-scope */
import {render, screen} from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {
      page: 'home',
      title: 'AI Demo',
      width: '100%',
    };

    // act
    render(<Navbar {...props} />);

    // assert
    expect(
        screen.getAllByRole('link', {name: 'Home'}),
    ).toBeDefined();
  });
});
