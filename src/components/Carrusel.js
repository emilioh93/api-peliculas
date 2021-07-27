import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Card } from "react-bootstrap";

const Carrusel = (props) => {
  const ComponentFavoritas = props.componentFavoritas;

  return (
    <div>
      <OwlCarousel items={5} className="owl-theme" loop nav margin={8}>
        {props.peliculas.map((pelicula, index) => (
          <div>
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
        ))}
      </OwlCarousel>
    </div>
  );
};

export default Carrusel;
