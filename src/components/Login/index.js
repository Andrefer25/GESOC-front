import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "../../assets/css/index.css";

function onClickLogin() {
    localStorage.setItem('user', 'Admin');
    window.location.href='/';
}
class Login extends Component {
  render() {
    return (
      <Container maxWith="sm">
        <div className="login">
          <h3>Iniciar Sesion</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" onClick={onClickLogin}>Primary</Button>
          </Form>
          <div>
              <p className="pregunta">No tenes cuenta?</p>
              <p className="registerLink"><Link to="/register">Registrate aca</Link></p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Login;
