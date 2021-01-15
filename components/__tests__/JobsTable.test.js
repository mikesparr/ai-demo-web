/* eslint-disable react/react-in-jsx-scope */
import {render} from '@testing-library/react';
import JobsTable from '../JobsTable';

describe('JobsTable', () => {
  it('renders without crashing', () => {
    // arrange
    const props = {

    };

    // act
    render(<JobsTable {...props} />);
  });
});
