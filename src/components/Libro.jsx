import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Libro = ({ libro, eliminarLibro, editarLibro, bloquearLibro, desbloquearLibro, esBloqueado }) => {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(libro.titulo);
  const [autor, setAutor] = useState(libro.autor);
  const [descripcion, setDescripcion] = useState(libro.descripcion);

  const guardarCambios = () => {
    editarLibro({ ...libro, titulo, autor, descripcion });
    setEditando(false);
  };

  return (
    <div className="libro">
      {editando ? (
        <div>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button onClick={guardarCambios}>Guardar</button>
        </div>
      ) : (
        <div>
          {libro.imagen && <img src={libro.imagen} alt={libro.titulo} />}
          <h3>{libro.titulo}</h3>
          <p><strong>Autor:</strong> {libro.autor}</p>
          <p>{libro.descripcion}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
          <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
          {esBloqueado ? (
            <button onClick={() => desbloquearLibro(libro.id)}>Desbloquear</button>
          ) : (
            <button onClick={() => bloquearLibro(libro)}>Bloquear</button>
          )}
        </div>
      )}
    </div>
  );
};

Libro.propTypes = {
  libro: PropTypes.object.isRequired,
  eliminarLibro: PropTypes.func.isRequired,
  editarLibro: PropTypes.func.isRequired,
  bloquearLibro: PropTypes.func,
  desbloquearLibro: PropTypes.func,
  esBloqueado: PropTypes.bool
};

export default Libro;
