import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import "./../../assets/css/index.css";
import { upload } from "../../helpers/uploadTest";


class Register extends Component {
    
    constructor() {
        super();
        this.state = {
            file: null
        }
    }

    onClick = async() => {
        let file = this.state.file;
        await upload(file);
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    render () {
        return (
          <Container>
            <div className="register">
                <h2 className="loginTitle">Crear cuenta</h2>
                <br/>
                <br/>
                <input type="file" onChange={this.onFileChange} /> 
                <br/>
                <br/>
                <Button color="primary" onClick={this.onClick}>Subir archivo</Button>
            </div>
          </Container>
        );
    }
}

export default Register;