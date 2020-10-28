import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { getListaCategorias, getIndexCategoria, getCategoria } from './../../../../../helpers/categorias';
import { validateInputNumber } from './../../../../../helpers/validator';

class EditarEntidad extends Component  {

    constructor() {
        super();
        this.state = {
            invalidCantEmpleados: false,
            invalidPromedio: false
        }
    }

    renderFooter = (
        <div>
            <Button color="primary" onClick={() => this.onSubmit()}>Guardar</Button>
        </div>
    );

    onSubmit = async () => {
        let cantEmpleados = document.getElementById("cantEmpleados").value || "";
        let promedioVentas = document.getElementById("promedioVentas").value || "";
        let actividad = document.getElementById("entActividad").value;
        this.setState({ invalidCantEmpleados: false, invalidPromedio: false });
        if(validateInputNumber(cantEmpleados) && validateInputNumber(promedioVentas)) {
            await this.props.onSubmit({
                "idEntidadJuridica": 1,
                "empleados": cantEmpleados,
                "actividad": getCategoria(actividad),
                "promedioActividad": promedioVentas
            })
        } else {
            if(!validateInputNumber(cantEmpleados)) {
                this.setState({ invalidCantEmpleados: true });
            }
            if(!validateInputNumber(promedioVentas)) {
                this.setState({ invalidPromedio: true });
            }
        }
        this.props.onHide();
    }

    renderCategorias = () => {
        let categorias = getListaCategorias();
        return categorias.map((categoria, index) => (
            <option key={index} value={index}>{categoria}</option>
        ))
    }

    render() {
        let { onHide, visible, entidadJuridica } = this.props;
        return (
            <Dialog header="Editar Entidad Juridica" visible={visible} style={{ width: '30vw' }} footer={this.renderFooter} onHide={() => onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Actividad</Label>
                        <Input type="select" name="select" id="entActividad" defaultValue={getIndexCategoria(entidadJuridica.actividad)}>
                            { this.renderCategorias() }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad de empleados</Label>
                        <Input type="number" id="cantEmpleados" placeholder="Ingresa la cantidad" defaultValue={entidadJuridica.cantidadEmpleados} invalid={this.state.invalidCantEmpleados} />
                        {
                            this.state.invalidCantEmpleados &&
                            <FormFeedback>Ingrese un nombre ficticio válido</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Promedio de ventas</Label>
                        <Input type="number" id="promedioVentas" placeholder="Ingresa el promedio" defaultValue={entidadJuridica.promedioVentas} invalid={this.state.invalidPromedio} />
                        {
                            this.state.invalidPromedio &&
                            <FormFeedback>Ingrese un nombre ficticio válido</FormFeedback>
                        }
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}

export default EditarEntidad;