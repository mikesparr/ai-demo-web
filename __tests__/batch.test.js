import {
  submitBatch,
  submitCorrectedBatch,
} from '../lib/batch';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('lib:batch', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('submits batch to API', async () => {
    // arrange
    const url = 'https://myco.com';
    const request = {batch_id: 'batch-1'};
    const response = {
      batch_id: 'batch-1',
      success: true,
    };
    fetch.mockResponseOnce(JSON.stringify(response));

    // act
    const resp = await submitBatch(url, request);

    // assert
    expect(resp.success).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('submits corrected batch to API', async () => {
    // arrange
    const url = 'https://myco.com';
    const request = {batch_id: 'batch-1'};
    const response = {
      batch_id: 'batch-1',
      success: true,
    };
    fetch.mockResponseOnce(JSON.stringify(response));

    // act
    const resp = await submitCorrectedBatch(url, request);

    // assert
    expect(resp.success).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
