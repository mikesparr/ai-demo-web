/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {act, render, screen} from '@testing-library/react';
import Home from '../pages/index';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    SOME_VARIABLE_HERE: 'whatever-you-want-here',
  },
}));

describe('Home', () => {
  it('renders without crashing', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Home data={{jobs: []}} />);

    await act(() => promise);
  });

  it('displays expected components', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Home data={{jobs: []}} />);

    // assert
    expect(screen.getByRole('heading', {name: 'AI Demo'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Model accuracy'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Welcome'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Github repo'})).toBeInTheDocument();
    expect(screen.getAllByRole('link', {name: 'Home'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Review'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Jobs'})).toHaveLength(2);
    expect(screen.getByRole('link', {name: 'Top'})).toBeInTheDocument();

    await act(() => promise);
  });
});
