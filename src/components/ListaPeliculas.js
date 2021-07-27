import React from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import imgNoDisponible from "../images/ImagenNoDisponible.png";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const ListaPeliculas = (props) => {
  const ComponentFavoritas = props.componentFavoritas;

  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {props.peliculas.map((pelicula, index) => (
          <Item>
            <Card className="cardContenedor">
              <Card.Img
                variant="top"
                src={
                  pelicula.Poster !== "N/A" ? pelicula.Poster : imgNoDisponible
                }
              />
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
          </Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ListaPeliculas;
