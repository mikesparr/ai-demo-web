import {
  newBatch,
  newRequest,
  submitBatch,
  submitCorrectedBatch,
} from '../lib/batch';

describe('lib:batch', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns correct number of random records', () => {
    // arrange

    // act
    const batchFive = newBatch(5);
    const batchTen = newBatch(10);
    const batchFifteen = newBatch(15);

    // assert
    expect(batchFive).toHaveLength(5);
    expect(batchTen).toHaveLength(10);
    expect(batchFifteen).toHaveLength(15);
  });

  it('splits batches for correct API request', () => {
    // arrange
    const batch = [
      {
        id: '1',
        variance: 0.01,
        skewness: 0.01,
        curtosis: 0.01,
        entropy: 0.01,
      },
      {
        id: '2',
        variance: 0.01,
        skewness: 0.01,
        curtosis: 0.01,
        entropy: 0.01,
      },
    ];

    // act
    const request = newRequest(batch);

    // assert
    expect(request.subjects).toHaveLength(2);
    expect(request.features).toHaveLength(2);
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
