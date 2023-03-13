import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function Home() {
  const { data, loading, filter } = useContext(MyContext);
  const { search, setSearch } = useContext(MyContext);
  const { number, setNumber } = useContext(MyContext);
  const { filters, setFilters } = useContext(MyContext);
  const { operador, setOperador } = useContext(MyContext);
  const { numericFilters, setNumericFilters } = useContext(MyContext);
  const { dataFiltered, setDataFiltered } = useContext(MyContext);

  const { order, setOrder } = useContext(MyContext);
  const [ordering, setOrdering] = useState({ column: 'population', sort: 'ASC' });

  const renderFilter = filter.filter((e) => numericFilters.every(
    (numericFilter) => numericFilter.filters !== e,
  ));

  useEffect(() => {
    const filteredPlanets = numericFilters.reduce(
      (acc, curr) => acc.filter((planet) => {
        switch (curr.operador) {
        case 'maior que':
          return Number(planet[curr.filters]) > Number(curr.number);
        case 'menor que':
          return Number(planet[curr.filters]) < Number(curr.number);
        default:
          return Number(planet[curr.filters]) === Number(curr.number);
        }
      }),
      data,
    );
    setDataFiltered(filteredPlanets);
  }, [numericFilters, data, setDataFiltered]);

  const OPERATORS = ['maior que', 'menor que', 'igual a'];
  if (loading) return <h1>Carregando</h1>;
  const tabelaFiltros = Object.keys(data[0]);
  return (

    <div>
      <div>
        <div>
          <input
            data-testid="name-filter"
            onChange={ ({ target }) => setSearch(target.value) }
            type="text"
          />
        </div>
        <div>
          <p>Coluna</p>
          <select
            data-testid="column-filter"
            onChange={ ({ target }) => setFilters(target.value) }
            name="Colum"
          >
            {renderFilter.map((e) => (
              <option key={ e } value={ e }>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Operador</p>
          <select
            onClick={ ({ target }) => {
              setOperador(target.value);
            } }
            data-testid="comparison-filter"
            name="Colum"
          >
            {OPERATORS.map((e) => (
              <option key={ e } value={ e }>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            data-testid="value-filter"
            value={ number }
            onChange={ ({ target }) => setNumber(target.value) }
            type="number"
            name="number"
          />
        </div>
        <div>
          <button
            onClick={ () => {
              setNumericFilters((prev) => [
                ...prev,
                { filters, operador, number },
              ]);
              setFilters(renderFilter[0]);
            } }
            data-testid="button-filter"
            type="button"
          >
            FILTRAR
          </button>
        </div>
        <div>
          <button
            data-testid="button-remove-filters"
            onClick={ () => setNumericFilters([]) }
            type="button"
          >
            REMOVER FILTROS

          </button>
        </div>
        <div>
          <p>Ordenar</p>
          <select
            data-testid="column-sort"
            name="Colum"
            onClick={ ({ target: { value } }) => {
              setOrdering({ ...ordering, column: value });
            } }
          >
            {filter.map((e) => (
              <option key={ e } value={ e }>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ASC">
            Ascendente
            <input
              onClick={ () => {
                setOrdering({ ...ordering, sort: 'ASC' });
              } }
              data-testid="column-sort-input-asc"
              type="radio"
              name="ordenar"
            />
          </label>
          <label htmlFor="DESC">
            Descendente
            <input
              onClick={ () => {
                setOrdering({ ...ordering, sort: 'DESC' });
              } }
              data-testid="column-sort-input-desc"
              type="radio"
              name="ordenar"
            />
          </label>
          <button
            onClick={ () => {
              setOrder(ordering);
            } }
            data-testid="column-sort-button"
            type="button"
          >
            ORDENAR

          </button>
        </div>
      </div>
      {numericFilters.map((e) => (
        <div key={ e.filters } data-testid="filter">
          {`${e.filters} ${e.number} ${e.operador}`}
          <button
            onClick={ () => {
              const c = numericFilters.filter((f) => f.filters !== e.filters);
              setNumericFilters(c);
            } }
          >
            X

          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            {tabelaFiltros
              .filter((ee) => ee !== 'residents')
              .map((e, index) => (
                <th key={ index }>{e}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dataFiltered
            .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
              const lessOne = -1;
              if (b[order.column] === 'unknown') {
                return lessOne;
              }
              if (order.sort === 'ASC') {
                return Number(a[order.column]) - Number(b[order.column]);
              }
              return Number(b[order.column]) - Number(a[order.column]);
            })
            .map((el) => (
              <tr key={ el.name }>
                <td data-testid="planet-name">{el.name}</td>
                <td>{el.rotation_period}</td>
                <td>{el.orbital_period}</td>
                <td>{el.diameter}</td>
                <td>{el.climate}</td>
                <td>{el.gravity}</td>
                <td>{el.terrain}</td>
                <td>{el.surface_water}</td>
                <td>{el.population}</td>
                <td>{el.films}</td>
                <td>{el.created}</td>
                <td>{el.edited}</td>
                <td>{el.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
