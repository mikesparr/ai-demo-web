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
  beforeEach(() => {
    fetch.resetMocks();
  });

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

  it('displays data from API call', async () => {
    // arrange
    const promise = Promise.resolve();
    fetch.mockResponse(JSON.stringify(
        {
          jobs: [
            {
              job_id: 'job-1',
              accuracy: 0.93,
              records: 10,
              data_prep_time: 0.01,
              training_time: 0.02,
              testing_time: 0.03,
            },
          ],
        },
    ));

    // act
    render(<Jobs data={{jobs: []}} />);
    await act(() => promise);

    // assert
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
