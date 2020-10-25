import React, { Component } from "react";
import { Link } from 'react-router-dom';
import LoginService from './../../services/LoginService';
import Container from "react-bootstrap/Container";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import "../../assets/css/index.css";
import UserImage from "../../assets/img/user-image.png";

class Login extends Component {

  constructor() {
    super();
    this.service = new LoginService();
    this.state = {
      errorLogin: false,
      tipoError: ""
    }
  }

  onClickLogin = () => {
    this.setState({ errorLogin: false });
    let user = document.getElementById("usuarioLogin").value || "";
    let pass = document.getElementById("passLogin").value || "";
    if(user === "" || pass === "") {
      this.setState({ errorLogin: true, tipoError: "Ingrese los datos por favor" })
    } else {
      let result = this.service.logIn({user, pass});
      if(result.status) {
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        window.location.href = '/';
      } else {
        this.setState({ errorLogin: true, tipoError: "Datos incorrectos. Intente nuevamente" })
      }
      
    }
  }


  render() {
    return (
      <Container maxWith="sm">
        <div className="login">
        <img className="imageCenterLogin" src={UserImage} alt="imagen de usuario"></img>
          <h3 className="loginTitle">Iniciar Sesion</h3>
          <Form>
            <FormGroup>
              {
                this.state.errorLogin &&
                <div>
                  <Label style={{color: "red"}}>{this.state.tipoError}</Label>
                  <br/>
                </div>
              }
              <Label>Usuario</Label>
              <Input type="text" id="usuarioLogin" placeholder="Ingresa tu usuario" />
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input type="password" id="passLogin" placeholder="Ingresa tu contraseña" />
              <FormText color="muted">
                No compartiremos tu información con nadie
              </FormText>
            </FormGroup>
            <Button color="primary" onClick={this.onClickLogin}>Submit</Button>
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
