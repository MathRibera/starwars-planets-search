import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import React from 'react';
import data from './mockData'

describe("Aquele teste maneirão", () => {
  afterEach(() => jest.clearAllMocks());

  test('teste end to end basicao', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });
    render(<App />);












  });
})
