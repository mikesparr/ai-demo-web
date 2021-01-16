/* eslint-disable react/react-in-jsx-scope */
import {act, render} from '@testing-library/react';
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
});
