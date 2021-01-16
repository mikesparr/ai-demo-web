/* eslint-disable react/react-in-jsx-scope */
import {act, render, screen, fireEvent} from '@testing-library/react';
import BatchReviewDrawer from '../components/BatchReviewDrawer';

describe('BatchReviewDrawer', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', () => {
    // arrange
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<BatchReviewDrawer {...props} />);
  });

  it('displays drawer when clicked', async () => {
    // arrange
    const promise = Promise.resolve();
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<BatchReviewDrawer {...props} />);
    await act(() => promise);
    const reviewButton = screen.getByText(/review/i);
    fireEvent.click(reviewButton);
    const saveButton = screen.getByRole('button', {name: 'Save'});

    // assert
    expect(saveButton).toBeDefined();
  });

  it('publishes corrections when saving', async () => {
    // arrange
    const promise = Promise.resolve();
    const handler = jest.fn();
    const props = {
      submitHandler: handler,
    };

    // act
    render(<BatchReviewDrawer {...props} />);
    await act(() => promise);
    const reviewButton = screen.getByText(/review/i);
    fireEvent.click(reviewButton);
    const saveButton = screen.getByRole('button', {name: 'Save'});
    fireEvent.click(saveButton);

    // assert
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
