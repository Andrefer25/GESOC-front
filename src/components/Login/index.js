import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "../../assets/css/index.css";
import UserImage from "../../assets/img/user-image.png";

function onClickLogin() {
    localStorage.setItem('user', 'Admin');
    window.location.href='/';
}
class Login extends Component {
  render() {
    return (
      <Container maxWith="sm">
        <div className="login">
        <img className="imageCenterLogin" src={UserImage}></img>
          <h3 className="loginTitle">Iniciar Sesion</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese nombre de usuario" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Recuerdame" />
            </Form.Group>
            <Button className="buttonLogin" variant="primary" onClick={onClickLogin}>Loguearse</Button>
          </Form>
          <div className="linkRegister">
              <p className="pregunta">No tenes cuenta?</p>
              <p className="registerLink"><Link to="/register">Registrate aca</Link></p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Login;
