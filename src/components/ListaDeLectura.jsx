import React from 'react';
import Libro from './Libro';
import PropTypes from 'prop-types';

const ListaDeLectura = ({ libros, eliminarLibro, editarLibro, bloquearLibro, desbloquearLibro, esBloqueado }) => {
  return (
    <div>
      {libros.map(libro => (
        <Libro 
          key={libro.id} 
          libro={libro} 
          eliminarLibro={eliminarLibro} 
          editarLibro={editarLibro} 
          bloquearLibro={bloquearLibro} 
          desbloquearLibro={desbloquearLibro} 
          esBloqueado={esBloqueado} 
        />
      ))}
    </div>
  );
};

ListaDeLectura.propTypes = {
  libros: PropTypes.array.isRequired,
  eliminarLibro: PropTypes.func.isRequired,
  editarLibro: PropTypes.func.isRequired,
  bloquearLibro: PropTypes.func,
  desbloquearLibro: PropTypes.func,
  esBloqueado: PropTypes.bool
};

export default ListaDeLectura;
