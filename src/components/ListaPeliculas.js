import React from "react";
import { Card } from "react-bootstrap";

const ListaPeliculas = (props) => {
  const ComponentFavoritas = props.componentFavoritas;

  return (
    <div>
      {props.peliculas.length === 0 ? (
        <span></span>
      ) : (
        props.peliculas.map((pelicula, index) => (
          <div className="mb-4 col-md-3 col-sm-12">
            <Card className="cardContenedor">
              <Card.Img variant="top" src={pelicula.Poster} />
              <Card.Body>
                <Card.Title>{pelicula.Title}</Card.Title>
              </Card.Body>
              <Card.Footer>{pelicula.Year}</Card.Footer>
              <div
                onClick={() => props.handleFavoritasClick(pelicula)}
                className="overlay"
              >
                <ComponentFavoritas></ComponentFavoritas>
              </div>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaPeliculas;
