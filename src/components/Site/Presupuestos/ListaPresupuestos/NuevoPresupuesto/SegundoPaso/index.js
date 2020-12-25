import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { validateInputText } from './../../../../../../helpers/validator';
import ProveedorService from "./../../../../../../services/ProveedorService"

class PrimerPaso extends Component {

    constructor() {
        super();
        this.proveedorService = new ProveedorService();
        
        this.state = {
            invalidDescripcion: false,
            monedas: null,
            proveedores: null  
        }
    }

    renderFooter = () => (
        <div>
            <Button color="primary" onClick={this.onSubmit}>Crear</Button>
        </div>
    );

    renderMoneda = (data) => {
        return data.map(e => (
            <option value={e.idMoneda} key={e.idMoneda}>{`${e.descripcion} (${e.simbolo})`}</option>
        ));
    }

    renderProveedores = (data) => {
        return data.map(e => (
            <option value={e.idProveedor} key={e.idProveedor}>{`${e.nombre} (CUIT ${e.cuit})`}</option>
        ));
    }

    componentDidMount = async () => {
        await this.getProveedores();
    }

    getProveedores = async () => {
        let proveedores = await this.proveedorService.getListaProveedores();

        this.setState({ proveedores })
    }

    onSubmit = () => {
        let detalles = document.getElementById("descripcion").value || "";
        this.setState({ invalidDescripcion: false });
        if(validateInputText(detalles)) {
            this.agregarPresupuesto();
        } else {
            if(!validateInputText(detalles)) {
                this.setState({ invalidDescripcion: true });
            }
        }
    }

    getImporteTotal = () => {
        let items = this.props.items;
        let count = 0;
        items.forEach(e => {
            count += e.valorUnitario * e.cantidad;
        });

        return count;
    }

    agregarPresupuesto = () => {
        let presupuesto = {
            detalles: document.getElementById("descripcion").value,
            moneda: { idMoneda: parseInt(document.getElementById("moneda").value) },
            proveedor: { idProveedor: parseInt(document.getElementById("proveedor").value) },
            importe: document.getElementById("importe").value,
            items: this.props.items,
            entidadJuridica: { idEntidadJuridica: parseInt(localStorage.getItem("entJuridica")) }
        }
        console.log(presupuesto);
        this.props.insertData(presupuesto);
    }

    render() {
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input type="text" id="descripcion" placeholder="Ingresa la descripción" invalid={this.state.invalidDescripcion} />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Moneda</Label>
                                <Input type="select" name="select" id="moneda">
                                    {this.renderMoneda(this.props.monedas)}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            {
                                this.state.proveedores &&
                                <FormGroup>
                                    <Label>Proveedor</Label>
                                    <Input type="select" name="select" id="proveedor">
                                        {this.renderProveedores(this.state.proveedores)}
                                    </Input>
                                </FormGroup>
                            }
                            <FormGroup>
                                <Label>Importe total</Label>
                                <Input type="number" id="importe" defaultValue={this.getImporteTotal()} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Button color="primary" onClick={() => this.onSubmit()}>Crear</Button>
            </div>
        );
    }
}

export default PrimerPaso;