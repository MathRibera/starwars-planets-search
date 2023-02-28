import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState('population');
  const [number, setNumber] = useState(0);
  const [operador, setOperador] = useState('maior que');
  const [numericFilters, setNumericFilters] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataAscOrdered, setDataAscOrdered] = useState(false);
  const [dataDescOrdered, setDataDescOrdered] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const { results } = await (await fetch('https://swapi.dev/api/planets')).json();
      const dataNoResidents = results.map((e) => {
        delete e.residents;
        return e;
      });
      setDataFiltered(dataNoResidents);
      setData(dataNoResidents);
      setLoading(false);
    };
    fetchApi();
  }, []);
  const value = { data,
    loading,
    setSearch,
    search,
    setFilters,
    filters,
    setNumber,
    number,
    setOperador,
    operador,
    setNumericFilters,
    numericFilters,
    dataFiltered,
    setDataFiltered,
    dataAscOrdered,
    setDataAscOrdered,

  };
  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default MyProvider;
