/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {act, render, screen} from '@testing-library/react';
import Jobs from '../pages/jobs';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    SOME_VARIABLE_HERE: 'whatever-you-want-here',
  },
}));

describe('Jobs', () => {
  it('renders without crashing', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Jobs data={{jobs: []}} />);

    await act(() => promise);
  });

  it('displays expected components', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Jobs data={{jobs: []}} />);

    // assert
    expect(screen.getByRole('heading', {name: 'AI Demo'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Training Jobs'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Jobs'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Github repo'})).toBeInTheDocument();
    expect(screen.getAllByRole('link', {name: 'Home'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Review'})).toHaveLength(2);
    expect(screen.getAllByRole('link', {name: 'Jobs'})).toHaveLength(2);
    expect(screen.getByRole('link', {name: 'Top'})).toBeInTheDocument();

    await act(() => promise);
  });
});
