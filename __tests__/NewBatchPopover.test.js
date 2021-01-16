/* eslint-disable react/react-in-jsx-scope */
import {act, render, screen, fireEvent} from '@testing-library/react';
import NewBatchPopover from '../components/NewBatchPopover';

describe('NewBatchPopover', () => {
  it('renders without crashing', async () => {
    // arrange
    const promise = Promise.resolve();
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<NewBatchPopover {...props} />);

    await act(() => promise);
  });

  it('displays popover when clicked', async () => {
    // arrange
    const promise = Promise.resolve();
    const props = {
      submitHandler: jest.fn(),
    };

    // act
    render(<NewBatchPopover {...props} />);
    await act(() => promise);
    const newBatchButton = screen.getByText(/new batch/i);
    fireEvent.click(newBatchButton);
    const submitBatchButton = screen.getByText(/submit batch/i);

    // assert
    expect(submitBatchButton).toBeDefined();
  });
});
