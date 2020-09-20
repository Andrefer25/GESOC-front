import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from "@material-ui/core";

import "./../../assets/css/index.css";

const useStyles = (theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: 250,
      },
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
            width: 150
        }
    }
});

const paises = [
    {
      value: 'Argentina',
      label: 'Argentina',
    },
    {
      value: 'Brasil',
      label: 'Brasil',
    },
    {
      value: 'Chile',
      label: 'Chile',
    },
    {
      value: 'Colombia',
      label: 'Colombia',
    },
];

const provincias = [
    {
        value: 'Buenos Aires',
        label: 'Buenos Aires',
    },
    {
        value: 'Cordoba',
        label: 'Cordoba',
    },
    {
        value: 'Misiones',
        label: 'Misiones',
    }
];

const localidades = [
    {
        value: 'Martinez',
        label: 'Martinez',
    },
    {
        value: 'San Isidro',
        label: 'San Isidro',
    },
    {
        value: 'Vicente Lopez',
        label: 'Vicente Lopez',
    }
];

const getItems = (ar) => (
    ar.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
    ))
)

class Register extends Component {
    render () {
        const { classes } = this.props;
        return (
          <Container maxWidth="sm">
            <div className="register">
                <h2>Crear cuenta</h2>
                <form className={classes.root} noValidate autoComplete="off">
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
                    <div className={classes.button}>
                        <Button variant="contained" color="primary" >
                            Registrarse
                        </Button>
                        <Button variant="contained" color="secondary">
                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>Cancelar</Link>
                        </Button>
                    </div>
                </form>
            </div>
          </Container>
        );
    }
}

export default withStyles(useStyles)(Register);