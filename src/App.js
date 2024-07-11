import React, { useState, useEffect } from 'react';
import BusquedaDeLibros from './components/BusquedaDeLibros';
import ListaDeLectura from './components/ListaDeLectura';
import Filtro from './components/Filtro';
import './App.css';

const App = () => {
  const [listaDeLectura, setListaDeLectura] = useState([]);
  const [librosBloqueados, setLibrosBloqueados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [totalLibros, setTotalLibros] = useState(0);

  useEffect(() => {
    const listaAlmacenada = JSON.parse(localStorage.getItem('listaDeLectura')) || [];
    const librosBloqueadosAlmacenados = JSON.parse(localStorage.getItem('librosBloqueados')) || [];
    setListaDeLectura(listaAlmacenada);
    setLibrosBloqueados(librosBloqueadosAlmacenados);
    setTotalLibros(listaAlmacenada.length + librosBloqueadosAlmacenados.length);
  }, []);

  useEffect(() => {
    localStorage.setItem('listaDeLectura', JSON.stringify(listaDeLectura));
    setTotalLibros(listaDeLectura.length + librosBloqueados.length);
  }, [listaDeLectura]);

  useEffect(() => {
    localStorage.setItem('librosBloqueados', JSON.stringify(librosBloqueados));
    setTotalLibros(listaDeLectura.length + librosBloqueados.length);
  }, [librosBloqueados]);

  const agregarLibroAListaDeLectura = (libro) => {
    setListaDeLectura([libro, ...listaDeLectura]);
    setMensaje(`"${libro.titulo}" se ha agregado a tu lista de lectura.`);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const eliminarLibro = (libroId, esBloqueado) => {
    if (esBloqueado) {
      setLibrosBloqueados(librosBloqueados.filter(libro => libro.id !== libroId));
    } else {
      setListaDeLectura(listaDeLectura.filter(libro => libro.id !== libroId));
    }
  };

  const editarLibro = (libroActualizado) => {
    setListaDeLectura(listaDeLectura.map(libro =>
      libro.id === libroActualizado.id ? libroActualizado : libro
    ));
  };

  const bloquearLibro = (libro) => {
    setLibrosBloqueados([libro, ...librosBloqueados]);
    eliminarLibro(libro.id, false);
    setMensaje(`"${libro.titulo}" se ha bloqueado.`);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const desbloquearLibro = (libroId) => {
    const libroDesbloqueado = librosBloqueados.find(libro => libro.id === libroId);
    setLibrosBloqueados(librosBloqueados.filter(libro => libro.id !== libroId));
    setListaDeLectura([libroDesbloqueado, ...listaDeLectura]);
    setMensaje(`"${libroDesbloqueado.titulo}" se ha desbloqueado.`);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const librosFiltrados = listaDeLectura.filter(libro =>
    libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    libro.autor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Organizador de Lecturas</h1>
      {mensaje && <div className="mensaje">{mensaje}</div>}
      <div className="estadisticas">
        <p>Total de libros agregados: {totalLibros}</p>
        <p>Libros en la lista de lectura: {listaDeLectura.length}</p>
        <p>Libros bloqueados: {librosBloqueados.length}</p>
      </div>
      <BusquedaDeLibros agregarLibroAListaDeLectura={agregarLibroAListaDeLectura} />
      <Filtro setFiltro={setFiltro} />
      <ListaDeLectura 
        libros={librosFiltrados} 
        eliminarLibro={(id) => eliminarLibro(id, false)} 
        editarLibro={editarLibro} 
        bloquearLibro={bloquearLibro}
      />
      <h2>Libros Bloqueados</h2>
      <ListaDeLectura 
        libros={librosBloqueados} 
        eliminarLibro={(id) => eliminarLibro(id, true)} 
        editarLibro={editarLibro} 
        desbloquearLibro={desbloquearLibro}
        esBloqueado={true}
      />
    </div>
  );
};

export default App;
