import React, { useContext, useEffect } from 'react';
import './App.css';
import MyContext from './context/MyContext';

function App() {
  const { data, loading, filter } = useContext(MyContext);
  const { search, setSearch } = useContext(MyContext);
  const { number, setNumber } = useContext(MyContext);
  const { filters, setFilters } = useContext(MyContext);
  const { operador, setOperador } = useContext(MyContext);
  const { numericFilters, setNumericFilters } = useContext(MyContext);
  const { dataFiltered, setDataFiltered } = useContext(MyContext);

  console.log(filter);
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
          <button type="button">REMOVER FILTROS</button>
        </div>
        <div>
          <p>Ordenar</p>
          <select name="Colum">
            {filter.map((e) => (
              <option key={ e }>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ASC">
            Ascendente
            <input type="radio" name="ordenar" id="ASC" />
          </label>
          <label htmlFor="DESC">
            Descendente
            <input type="radio" name="ordenar" id="DESC" />
          </label>
          <button type="button">ORDENAR</button>
        </div>
      </div>
      {numericFilters.map((e) => (
        <div key={ e.filters }>{`${e.filters} ${e.number} ${e.operador}`}</div>
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
            .map((el) => (
              <tr key={ el.name }>
                <td>{el.name}</td>
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

export default App;
