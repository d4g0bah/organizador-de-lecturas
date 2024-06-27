import React, { useState } from 'react';
import axios from 'axios';
import ResultadoBusquedaLibros from './ResultadoBusquedaLibros';

const BusquedaDeLibros = ({ agregarLibroAListaDeLectura }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const buscarLibros = async (e) => {
    e.preventDefault();
    setError(null); // Resetear el estado de error antes de realizar la búsqueda

    try {
      const respuesta = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${terminoBusqueda}`);
      setResultados(respuesta.data.items);
    } catch (error) {
      setError('No se pudo realizar la búsqueda. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div>
      <form onSubmit={buscarLibros}>
        <input
          type="text"
          placeholder="Buscar libros"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ResultadoBusquedaLibros resultados={resultados} agregarLibroAListaDeLectura={agregarLibroAListaDeLectura} />
    </div>
  );
};

export default BusquedaDeLibros;
