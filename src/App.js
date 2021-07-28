import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ListaPeliculas from "./components/ListaPeliculas";
import Formulario from "./components/Formulario";
import AddFavoritas from "./components/AddFavoritas";
import EliminarFavoritas from "./components/EliminarFavoritas";
import Swal from "sweetalert2";
import ListaFavoritas from "./components/ListaFavoritas";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [favoritas, setFavoritas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const consultarAPI = async (busqueda) => {
    const url = `https://www.omdbapi.com/?s=${busqueda}&apikey=f0f213df`;

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
    Swal.fire({
      title: "Película agregada",
      text: "La película fue agregada a su lista de favoritos.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    const nuevoArregloFavoritas = [...favoritas, pelicula];
    setFavoritas(nuevoArregloFavoritas);
    guardarLS(nuevoArregloFavoritas);
  };

  const eliminarPeliFavorita = (pelicula) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar?",
      text: "Está seguro que desea eliminarla de su lista de favoritos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const nuevoArregloFavoritas = favoritas.filter(
          (favorita) => favorita.imdbID !== pelicula.imdbID
        );
        setFavoritas(nuevoArregloFavoritas);
        guardarLS(nuevoArregloFavoritas);
        Swal.fire(
          "Película eliminada!",
          "La película fue eliminada de su lista de favoritos.",
          "success"
        );
      }
    });
  };

  return (
    <div>
      <Formulario busqueda={busqueda} setBusqueda={setBusqueda}></Formulario>
      <Container className="mt-5">
        <div className="my-5">
          <ListaPeliculas
            titulo={"Películas"}
            categoria={"movie"}
            peliculas={peliculas}
            handleFavoritasClick={addPeliFavorita}
            componentFavoritas={AddFavoritas}
          ></ListaPeliculas>
        </div>
        <div className="my-5">
          <ListaPeliculas
            titulo={"Series"}
            categoria={"series"}
            peliculas={peliculas}
            handleFavoritasClick={addPeliFavorita}
            componentFavoritas={AddFavoritas}
          ></ListaPeliculas>
        </div>
        <div className="my-5">
          <ListaPeliculas
            titulo={"Episodios"}
            categoria={"episode"}
            peliculas={peliculas}
            handleFavoritasClick={addPeliFavorita}
            componentFavoritas={AddFavoritas}
          ></ListaPeliculas>
        </div>
        <div className="my-5">
          <ListaFavoritas
            titulo={"Mi Lista"}
            peliculas={favoritas}
            handleFavoritasClick={eliminarPeliFavorita}
            componentFavoritas={EliminarFavoritas}
          ></ListaFavoritas>
        </div>
      </Container>
    </div>
  );
}

export default App;
