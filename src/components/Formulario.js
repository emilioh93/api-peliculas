import React from 'react';
import { Form, FormControl} from "react-bootstrap";

const Formulario = (props) => {
    return (
        <Form className="d-flex">
        <FormControl
        placeholder="Ingrese una película o serie"
          type="text"
          onChange={(e) => props.setBusqueda(e.target.value)}
        />
      </Form>
    );
};

export default Formulario;