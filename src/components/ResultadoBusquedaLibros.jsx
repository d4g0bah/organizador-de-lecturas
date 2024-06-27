import React from 'react';

const ResultadoBusquedaLibros = ({ resultados, agregarLibroAListaDeLectura }) => {
  return (
    <div>
      {resultados ? (
        resultados.map(resultado => (
          <div key={resultado.id} className="libro">
            <h3>{resultado.volumeInfo.title}</h3>
            <p><strong>Autor(es):</strong> {resultado.volumeInfo.authors ? resultado.volumeInfo.authors.join(', ') : 'Autor desconocido'}</p>
            <p>{resultado.volumeInfo.description ? resultado.volumeInfo.description.substring(0, 200) + '...' : 'Sin descripción'}</p>
            <button onClick={() => agregarLibroAListaDeLectura({
              id: resultado.id,
              titulo: resultado.volumeInfo.title,
              autor: resultado.volumeInfo.authors ? resultado.volumeInfo.authors.join(', ') : 'Autor desconocido',
              descripcion: resultado.volumeInfo.description ? resultado.volumeInfo.description : 'Sin descripción',
              imagen: resultado.volumeInfo.imageLinks ? resultado.volumeInfo.imageLinks.thumbnail : ''
            })}>Agregar a la lista</button>
          </div>
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default ResultadoBusquedaLibros;
