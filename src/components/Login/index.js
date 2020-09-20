import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from '@material-ui/core';

import "../../assets/css/index.css";

class Login extends Component {

    render() {
        return (
            <Container maxWith ="sm">
                <div className="login">
                    <h3>Iniciar Sesion</h3>
                    <TextField variant="filled" id="filled-required" label="Email"/>
                    <br/>
                    <br/>
                    <TextField variant="filled" id="filled-required" label="Password"/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary">
                        Entrar
                    </Button>
                    <br/>
                    <br/>
                    <div><p>No tenes cuenta? <Link to="/register">Registrate</Link></p></div>
                </div>
            </Container>
        )
    }
}

export default Login;