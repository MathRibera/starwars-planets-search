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
    userEvent.selectOptions(screen.getByTestId("column-filter"), 'diameter')
    expect(screen.getByTestId('comparison-filter'))
    userEvent.click(screen.getByTestId('comparison-filter'))
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.click(screen.getByTestId('comparison-filter'))
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que')
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.click(screen.getByTestId('comparison-filter'))
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a')
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.click(screen.getByTestId('button-remove-filters'))
    expect(screen.getByTestId('value-filter'))
    expect(screen.getByTestId('button-filter'))
    expect(screen.getByTestId('button-remove-filters'))
    userEvent.click(screen.getByTestId('comparison-filter'))
    expect(screen.getByText('Ordenar'))
    expect(screen.getByTestId('column-sort'))
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'diameter')
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
    await waitFor(() => expect(screen.getByRole('button', { name: /x/i })))
    userEvent.click(screen.getByRole('button', { name: /x/i }))
    userEvent.click(screen.getByTestId('column-sort-input-asc'))
    userEvent.click(screen.getByTestId('column-sort-input-desc'))
    userEvent.click(screen.getByTestId('column-sort-input-asc'))
    await waitFor (() => expect(screen.getByRole('cell', {
      name: /Tatooine/i
    })))
    userEvent.click(screen.getByTestId('button-filter'))
    await waitFor(() => screen.getByRole('button', { name: /x/i }))
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.click(screen.getByTestId('comparison-filter'))
  });
  it('outro end to end basicao', async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      screen.findByTestId("name-filter")
    })
    await waitFor(() => expect(screen.getByTestId('name-filter')))
    userEvent.selectOptions(screen.getByTestId("column-sort"), 'diameter')
    userEvent.click(screen.getByTestId('column-sort-input-desc'))
    const planetsNames = await screen.findAllByTestId('planet-name')
    expect(planetsNames).toHaveLength(10)
    expect(planetsNames[0].innerHTML).toBe('Bespin')
  })


})
