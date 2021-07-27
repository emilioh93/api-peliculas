import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Card } from "react-bootstrap";

const Carrusel = (props) => {
  const ComponentFavoritas = props.componentFavoritas;

  return (
    <div className="mb-4">
      <h3 className="text-light">{props.titulo}</h3>
      <OwlCarousel
        items={5}
        className="owl-theme"
        dots
        autoplay
        autoplayHoverPause
        callbacks
        info
        margin={8}
      >
        {props.peliculas.map((pelicula, index) => (
          <div itemElement className="">
            <Card className="cardContenedor">
              <Card.Img
                variant="top"
                src={pelicula.Poster}
                alt="poster película"
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
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default Carrusel;
