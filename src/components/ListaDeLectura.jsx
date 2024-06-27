import React from 'react';
import Libro from './Libro';

const ListaDeLectura = ({ libros, eliminarLibro, editarLibro }) => {
  return (
    <div>
      {libros.map(libro => (
        <Libro key={libro.id} libro={libro} eliminarLibro={eliminarLibro} editarLibro={editarLibro} />
      ))}
    </div>
  );
};

export default ListaDeLectura;
