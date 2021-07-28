import React from "react";
import { Badge, Card } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import imgNoDisponible from "../images/ImagenNoDisponible.png";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 5 },
  { width: 1200, itemsToShow: 5 },
];

const ListaFavoritas = (props) => {
  const ComponentFavoritas = props.componentFavoritas;

  return (
    <div>
      <h3 className="my-4 text-light">{props.titulo}</h3>
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
              <Card.Footer className="d-flex justify-content-between">
                {pelicula.Year}
                {pelicula.Type === "movie" ? (
                  <Badge bg="warning" text="dark">
                    Película
                  </Badge>
                ) : (
                  <Badge bg="danger">Serie</Badge>
                )}
              </Card.Footer>
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

export default ListaFavoritas;
