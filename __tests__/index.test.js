/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {act, render, screen, fireEvent} from '@testing-library/react';
import Home from '../pages/index';
import {getServerSideProps} from '../pages/index';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    SOME_VARIABLE_HERE: 'whatever-you-want-here',
  },
}));

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Home data={{jobs: [], batches: []}} />);

    await act(() => promise);
  });

  it('displays expected components', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Home data={{jobs: [], batches: []}} />);

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

  it('displays new batch popover when clicked', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Home data={{jobs: []}} />);
    await act(() => promise);
    const newBatchButton = screen.getAllByText(/new batch/i);
    fireEvent.click(newBatchButton[0]);
    const submitBatchButton = screen.getByRole('button', {name: 'Submit Batch'});

    // assert
    expect(submitBatchButton).toBeDefined();
  });

  it('performs two fetches for serverSideProps', async () => {
    // arrange
    const response = {
      success: true,
    };
    fetch.mockResponse(JSON.stringify(response));

    // act
    const resp = await getServerSideProps();

    // assert
    expect(resp.props.data.jobs.success).toBeTruthy();
    expect(resp.props.data.batches.success).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
