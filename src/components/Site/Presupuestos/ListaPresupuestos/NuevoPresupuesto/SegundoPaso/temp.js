import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { validateInputNumber, validateInputText } from './../../../../../helpers/validator';
import MediosDePagoService from './../../../../../services/MediosDePagoService';
import ProveedorService from '../../../../../services/ProveedorService';


export default class NuevoPresupuesto extends Component {

    constructor() {
        super();
        this.service = new MediosDePagoService();
        this.proveedorService = new ProveedorService();
        this.state = {
            invalidID: false,
            invalidDescripcion: false,
            invalidImporte: false,
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
        this.getMonedas().then(async () => {
            await this.getProveedores();
        });
    }

    getMonedas = async () => {
        let monedas = await this.service.getMonedas();

        this.setState({ monedas });
    }

    getProveedores = async () => {
        let proveedores = await this.proveedorService.getListaProveedores();

        this.setState({ proveedores })
    }

    onSubmit = async () => {
        let descripcion = document.getElementById("descripcion").value || "";
        let importe = document.getElementById("importe").value || "";
        let moneda = {idMoneda: parseInt(document.getElementById("moneda").value)};
        let egreso = {idEgreso: parseInt(document.getElementById("egreso").value)};
        this.setState({ invalidImporte: false, invalidDescripcion: false });
        if(validateInputNumber(importe) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                importe: parseInt(importe), descripcion, moneda, egreso
            })
        } else {
            if(!validateInputText(descripcion)) {
                this.setState({ invalidDescripcion: true });
            }
            if(!validateInputNumber(importe)) {
                this.setState({ invalidImporte: true });
            }
        }
    }

    render() {
        return (
            <Dialog header="Nuevo Presupuesto" visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Descripcion</Label>
                                <Input type="text" id="descripcion" placeholder="Ingresa la descripcion" invalid={this.state.invalidDescripcion} />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
                            {
                                this.state.monedas &&
                                <FormGroup>
                                    <Label>Moneda</Label>
                                    <Input type="select" name="select" id="moneda">
                                        {this.renderMoneda(this.state.monedas)}
                                    </Input>
                                </FormGroup>
                            }
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
                                <Label>Importe</Label>
                                <Input type="number" id="importe" placeholder="Ingresa el importe" invalid={this.state.invalidImporte} />
                                {
                                    this.state.invalidImporte &&
                                    <FormFeedback>Ingrese un importe válido</FormFeedback>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Dialog>
        )
    }

}