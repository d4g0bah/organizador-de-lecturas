import React from 'react';

const Filtro = ({ setFiltro }) => {
  return (
    <input
      type="text"
      placeholder="Buscar en la lista de lectura"
      onChange={(e) => setFiltro(e.target.value)}
    />
  );
};

export default Filtro;
