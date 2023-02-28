import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import dataMock from './mockData'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe("Aquele teste maneirão", () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => (dataMock)
    }))
  })
  afterEach(() => jest.clearAllMocks());

  it('teste end to end basicao', async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })

    await waitFor(() => expect(screen.getByTestId('name-filter')))
    expect(screen.getByText(/coluna/i))
    expect(screen.getByTestId("column-filter"))
    expect(screen.getByTestId('comparison-filter'))
    expect(screen.getByTestId('value-filter'))
    expect(screen.getByTestId('button-filter'))
    expect(screen.getByTestId('button-remove-filters'))
    expect(screen.getByText('Ordenar'))
    expect(screen.getByTestId('column-sort'))
    expect(screen.getByTestId('column-sort-input-asc'))
    expect(screen.getByTestId('column-sort-input-desc'))
    expect(screen.getByText(/name/i))
    expect(screen.getByRole('columnheader', {
      name: /rotation_period/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /orbital_period/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /diameter/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /climate/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /gravity/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /terrain/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /surface_water/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /surface_water/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /films/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /created/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /edited/i
    }))
    expect(screen.getByRole('columnheader', {
      name: /url/i
    }))
    userEvent.type(screen.getByRole('textbox'), 'tatooine')
    expect(screen.getByTestId('planet-name').innerHTML).toBe('Tatooine')
    userEvent.type(screen.getByRole('textbox'), '')
    userEvent.type(screen.getByTestId('value-filter'), '4500000000')
    userEvent.click(screen.getByTestId('button-filter'))


  });
})
