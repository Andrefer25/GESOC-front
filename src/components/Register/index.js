import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import "./../../assets/css/index.css";

// const paises = [
//     {
//       value: 'Argentina',
//       label: 'Argentina',
//     },
//     {
//       value: 'Brasil',
//       label: 'Brasil',
//     },
//     {
//       value: 'Chile',
//       label: 'Chile',
//     },
//     {
//       value: 'Colombia',
//       label: 'Colombia',
//     },
// ];

// const provincias = [
//     {
//         value: 'Buenos Aires',
//         label: 'Buenos Aires',
//     },
//     {
//         value: 'Cordoba',
//         label: 'Cordoba',
//     },
//     {
//         value: 'Misiones',
//         label: 'Misiones',
//     }
// ];

// const localidades = [
//     {
//         value: 'Martinez',
//         label: 'Martinez',
//     },
//     {
//         value: 'San Isidro',
//         label: 'San Isidro',
//     },
//     {
//         value: 'Vicente Lopez',
//         label: 'Vicente Lopez',
//     }
// ];

// const getItems = (ar) => (
//     ar.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//     ))
// )

function onClickLogin() {
    localStorage.setItem('user', 'Admin');
    window.location.href='/';
}

class Register extends Component {
    render () {
        return (
          <Container maxWidth="sm">
            <div className="register">
                <h2 className="loginTitle">Crear cuenta</h2>
                <Form.Group controlId="formBasicEmail">
                    <Row md={1}>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control className="inputRegister" type="text" placeholder="Ingrese nombre de usuario" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="inputRegister" type="email" placeholder="Ingrese e-mail" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control className="inputRegister" type="text" placeholder="Ingrese una contraseña" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Repita la contraseña</Form.Label>
                                <Form.Control className="inputRegister" type="text" placeholder="Ingrese nuevamente la contraseña" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div>
                        <Button className="buttonRegister" variant="primary" onClick = {onClickLogin}>
                            Registrarse
                        </Button>
                        <Button className="buttonRegisterCancel" variant="secondary">
                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>Cancelar</Link>
                        </Button>
                    </div>
                </Form.Group>
                {/* <form noValidate autoComplete="off">
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        label="Apellido"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="date"
                        label="Fecha Nacimiento"
                        type="date"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        label="Direccion"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Pais"
                        value={paises}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                        >
                        {getItems(paises)}
                    </TextField>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Provincia"
                        value={provincias}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                        >
                        {getItems(provincias)}
                    </TextField>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Localidad"
                        value={localidades}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                        >
                        {getItems(localidades)}
                    </TextField>
                    <TextField
                        label="Contrasena"
                        variant="outlined"
                        type="password"
                        size="small"
                    />
                    <TextField
                        label="Confirma Contrasena"
                        variant="outlined"
                        type="password"
                        size="small"
                    />
                    <br/>
                    <br/>
                    <div>
                        <Button variant="primary">
                            Registrarse
                        </Button>
                        <Button variant="secondary">
                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>Cancelar</Link>
                        </Button>
                    </div>
                </form> */}
            </div>
          </Container>
        );
    }
}

export default Register;