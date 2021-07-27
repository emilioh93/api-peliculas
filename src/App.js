import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ListaPeliculas from "./components/ListaPeliculas";
import Formulario from "./components/Formulario";
import AddFavoritas from "./components/AddFavoritas";
import EliminarFavoritas from "./components/EliminarFavoritas";

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
        <div className="my-5 row">
          <ListaPeliculas
            peliculas={peliculas}
            handleFavoritasClick={addPeliFavorita}
            componentFavoritas={AddFavoritas}
          ></ListaPeliculas>
        </div>
        <div className="my-5 row">
          <h2 className="text-light">Mi Lista</h2>
          <ListaPeliculas
            peliculas={favoritas}
            handleFavoritasClick={eliminarPeliFavorita}
            componentFavoritas={EliminarFavoritas}
          ></ListaPeliculas>
        </div>
      </Container>
    </div>
  );
}

export default App;
