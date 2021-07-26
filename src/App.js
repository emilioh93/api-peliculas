import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ListaPeliculas from "./components/ListaPeliculas";
import Formulario from "./components/Formulario";
import AddFavoritos from "./components/AddFavoritos";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const consultarAPI = async (busqueda) => {
    const url = `http://www.omdbapi.com/?s=${busqueda}&apikey=f0f213df`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
      setPeliculas(responseJson.Search);
    }
  };

  useEffect(() => {
    consultarAPI(busqueda);
  }, [busqueda]);

  return (
    <Container className="mt-5">
      <Formulario busqueda={busqueda} setBusqueda={setBusqueda}></Formulario>
      <div className="my-5 row">
        <ListaPeliculas peliculas={peliculas} componentFavoritos={AddFavoritos}></ListaPeliculas>
      </div>
    </Container>
  );
}

export default App;
