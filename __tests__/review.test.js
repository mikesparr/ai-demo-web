/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {act, render, screen} from '@testing-library/react';
import Review from '../pages/review';
import {getServerSideProps} from '../pages/review';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    SOME_VARIABLE_HERE: 'whatever-you-want-here',
  },
}));

describe('Review', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Review data={{jobs: []}} />);

    await act(() => promise);
  });

  it('displays expected components', async () => {
    // arrange
    const promise = Promise.resolve();

    // act
    render(<Review data={{jobs: []}} />);

    // assert
    expect(screen.getByRole('heading', {name: 'AI Demo'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Prediction Review'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Review'})).toBeInTheDocument();
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
          batches: [
            {
              batch_id: 'batch-1',
              subjects: ['subject-1'],
              predictions: ['real'],
            },
          ],
        },
    ));

    // act
    render(<Review data={undefined} />);
    await act(() => promise);
    const predictionNode = screen.getAllByText(/100%/i);

    // assert
    expect(predictionNode).toBeDefined();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('performs fetch for serverSideProps', async () => {
    // arrange
    const response = {
      batch_id: 'batch-1',
      success: true,
    };
    fetch.mockResponseOnce(JSON.stringify(response));

    // act
    const resp = await getServerSideProps();

    // assert
    expect(resp.props.data.success).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
