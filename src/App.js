import React, { useState, useEffect } from 'react';
import BusquedaDeLibros from './components/BusquedaDeLibros';
import ListaDeLectura from './components/ListaDeLectura';
import Filtro from './components/Filtro';
import './App.css';

const App = () => {
  const [listaDeLectura, setListaDeLectura] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const listaAlmacenada = JSON.parse(localStorage.getItem('listaDeLectura')) || [];
    setListaDeLectura(listaAlmacenada);
  }, []);

  useEffect(() => {
    localStorage.setItem('listaDeLectura', JSON.stringify(listaDeLectura));
  }, [listaDeLectura]);

  const agregarLibroAListaDeLectura = (libro) => {
    setListaDeLectura([libro, ...listaDeLectura]);
    setMensaje(`"${libro.titulo}" se ha agregado a tu lista de lectura.`);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const eliminarLibro = (libroId) => {
    setListaDeLectura(listaDeLectura.filter(libro => libro.id !== libroId));
  };

  const editarLibro = (libroActualizado) => {
    setListaDeLectura(listaDeLectura.map(libro =>
      libro.id === libroActualizado.id ? libroActualizado : libro
    ));
  };

  const librosFiltrados = listaDeLectura.filter(libro =>
    libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    libro.autor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Organizador de Lecturas</h1>
      {mensaje && <div className="mensaje">{mensaje}</div>}
      <BusquedaDeLibros agregarLibroAListaDeLectura={agregarLibroAListaDeLectura} />
      <Filtro setFiltro={setFiltro} />
      <ListaDeLectura libros={librosFiltrados} eliminarLibro={eliminarLibro} editarLibro={editarLibro} />
    </div>
  );
};

export default App;
