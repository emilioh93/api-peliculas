import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carrusel from "./components/Carrusel";
import Formulario from "./components/Formulario";
import AddFavoritas from "./components/AddFavoritas";
import EliminarFavoritas from "./components/EliminarFavoritas";
import { Container } from "react-bootstrap";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [favoritas, setFavoritas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const consultarAPI = async (busqueda) => {
    const url = `http://www.omdbapi.com/?s=${busqueda}&apikey=f0f213df`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setPeliculas(responseJson.Search);
    }
  };

  useEffect(() => {
    consultarAPI(busqueda);
  }, [busqueda]);

  useEffect(() => {
    const peliculasFavoritas = JSON.parse(
      localStorage.getItem("react-agregar-pelicula-favoritos")
    );

    if (peliculasFavoritas) {
      setFavoritas(peliculasFavoritas);
    }
  }, []);

  const guardarLS = (items) => {
    localStorage.setItem(
      "react-agregar-pelicula-favoritos",
      JSON.stringify(items)
    );
  };

  const addPeliFavorita = (pelicula) => {
    const nuevoArregloFavoritas = [...favoritas, pelicula];
    setFavoritas(nuevoArregloFavoritas);
    guardarLS(nuevoArregloFavoritas);
  };

  const eliminarPeliFavorita = (pelicula) => {
    const nuevoArregloFavoritas = favoritas.filter(
      (favorita) => favorita.imdbID !== pelicula.imdbID
    );
    
    setFavoritas(nuevoArregloFavoritas);
    guardarLS(nuevoArregloFavoritas);
  };

  return (
    <div>
      <Formulario busqueda={busqueda} setBusqueda={setBusqueda}></Formulario>
      <Container className="mt-5">
        <Carrusel
          titulo={"Resultados"}
          peliculas={peliculas}
          handleFavoritasClick={addPeliFavorita}
          componentFavoritas={AddFavoritas}
        ></Carrusel>
        <Carrusel
          titulo={"Mi Lista"}
          peliculas={favoritas}
          handleFavoritasClick={eliminarPeliFavorita}
          componentFavoritas={EliminarFavoritas}
        ></Carrusel>
      </Container>
    </div>
  );
}

export default App;
