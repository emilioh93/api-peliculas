import React from "react";
import { Card } from "react-bootstrap";

const ListaPeliculas = (props) => {
  const ComponentFavoritos = props.componentFavoritos;

  return (
    <>
      {props.peliculas.map((pelicula, index) => (
        <div className="mb-4 col-md-3 col-sm-12">
          <Card className="cardContenedor">
            <Card.Img variant="top" src={pelicula.Poster} />
            <Card.Body>
              <Card.Title>{pelicula.Title}</Card.Title>
            </Card.Body>
            <Card.Footer>{pelicula.Year}</Card.Footer>
            <div className="overlay">
              <ComponentFavoritos></ComponentFavoritos>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ListaPeliculas;
