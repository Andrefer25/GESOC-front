import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { validateInputText } from './../../../../../helpers/validator';
import MediosDePagoService from './../../../../../services/MediosDePagoService';
import EgresoService from '../../../../../services/EgresoService';
import ProveedorService from '../../../../../services/ProveedorService';

export default class DetalleEgreso extends Component {

    constructor() {
        super();
        this.service = new MediosDePagoService();
        this.egresoService = new EgresoService();
        this.proveedorService = new ProveedorService();
        this.state = {
            invalidNumIns: false,
            invalidDescripcion: false,
            invalidImporte: false,
            monedas: null,
            egresos: null,
            proveedores: null
        }
    }

    renderFooter = () => (
        <div>
            <Button color="primary" onClick={this.onSubmit}>Guardar</Button>
            <Button color="danger" onClick={this.onDelete}>Borrar</Button>
        </div>
    );

    renderMoneda = (data) => {
        return data.map(e => (
            <option value={e.idMoneda} key={e.idMoneda}>{`${e.descripcion} (${e.simbolo})`}</option>
        ));
    }

    renderEgreso = (data) => {
        return data.map(e => (
            <option value={e.idEgreso} key={e.idEgreso}>{`${e.idEgreso} - ${e.descripcion}`}</option>
        ));
    }

    componentDidMount = async () => {
        this.getMediosPago().then(() => {
            this.getEgresos().then(async() => {
                await this.getProovedores();
            });
        });
    }

    getMediosPago = async () => {
        let monedas = await this.service.getMonedas();

        this.setState({ monedas });
    }

    getEgresos = async () => {
        let egresos = await this.egresoService.getListaEgresos()

        this.setState({ egresos })
    }

    getProovedores = async() => {
        let proveedores = await this.proveedorService.getListaProveedores();

        this.setState({ proveedores })
    }

    renderProveedores = (data) => {
        return data.map(e => (
            <option value={e.idProveedor} key={e.idProveedor}>{`${e.nombre} (CUIT ${e.cuit})`}</option>
        ));
    }

    onDelete = async() => {
        let id = this.props.data.idEgreso;
        await this.props.borrarIngreso(id);
        this.props.onHide();
    }

    onSubmit = async () => {
        let descripcion = document.getElementById("descripcion").value || "";
        let idPresupuesto = parseInt(this.props.data.idPresupuesto);
        this.setState({ invalidInsPago: false, invalidDescripcion: false });
        if(validateInputText(descripcion)) {
            await this.props.onSubmit({
                descripcion, idPresupuesto, importe: this.props.data.importe
            })
        } else {
            if(!validateInputText(descripcion)) {
                this.setState({ invalidDescripcion: true });
            }
        }
    }

    render() {
        let { idPresupuesto, detalles, importe, moneda, proveedor } = this.props.data;
        return (
            <Dialog header={`Detalles Presupuesto ${idPresupuesto}`} visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Form>
                    <Row form>
                        <Col md={6}>
                            {
                                this.state.monedas &&
                                <FormGroup>
                                    <Label>Moneda</Label>
                                    <Input type="select" name="select" id="moneda" defaultValue={moneda}>
                                        {this.renderMoneda(this.state.monedas)}
                                    </Input>
                                </FormGroup>
                            }
                            {
                                this.state.proveedores &&
                                <FormGroup>
                                    <Label>Proveedor</Label>
                                    <Input type="select" name="select" id="proveedor" defaultValue={proveedor}>
                                        {this.renderProveedores(this.state.proveedores)}
                                    </Input>
                                </FormGroup>
                            }
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Descripcion</Label>
                                <Input type="text" id="descripcion" placeholder="Ingresa la descripcion" invalid={this.state.invalidDescripcion} defaultValue={detalles} />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Importe Total</Label>
                                <Input type="number" id="importe" defaultValue={importe} disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Dialog>
        )
    }
}