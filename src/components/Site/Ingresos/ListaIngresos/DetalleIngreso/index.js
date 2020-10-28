import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { validateInputNumber, validateInputText } from './../../../../../helpers/validator';
import MediosDePagoService from './../../../../../services/MediosDePagoService';



export default class DetalleIngreso extends Component {

    constructor() {
        super();
        this.service = new MediosDePagoService();
        this.state = {
            invalidID: false,
            invalidDescripcion: false,
            invalidImporte: false,
            monedas: null
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

    componentDidMount = async () => {
        await this.getMonedas();
    }

    getMonedas = async () => {
        let monedas = await this.service.getMonedas();

        this.setState({ monedas });
    }

    onDelete = async() => {
        let id = this.props.data.idIngreso;
        await this.props.borrarIngreso(id);
        this.props.onHide();
    }

    onSubmit = async () => {
        let clienteId = document.getElementById("clienteId").value || "";
        let descripcion = document.getElementById("descripcion").value || "";
        let importe = document.getElementById("importe").value || "";
        let idIngreso = this.props.data.idIngreso;
        let moneda = {idMoneda: parseInt(document.getElementById("moneda").value)};
        this.setState({ invalidInsPago: false, invalidDescripcion: false });
        if(validateInputNumber(clienteId) && validateInputNumber(importe) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                importe, descripcion, clienteId, idIngreso, moneda
            })
        } else {
            if(!validateInputText(descripcion)) {
                this.setState({ invalidDescripcion: true });
            }
            if(!validateInputNumber(clienteId)) {
                this.setState({ invalidID: true });
            }
            if(!validateInputNumber(importe)) {
                this.setState({ invalidImporte: true });
            }
        }
    }

    render() {
        let { idIngreso, descripcion, clienteId, importe, moneda } = this.props.data;
        return (
            <Dialog header={`Detalles Ingreso ${idIngreso}`} visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>ID Cliente</Label>
                                <Input type="number" id="clienteId" placeholder="Ingresa el ID" invalid={this.state.invalidID} defaultValue={clienteId} />
                                {
                                    this.state.invalidID &&
                                    <FormFeedback>Ingrese un ID válido</FormFeedback>
                                }
                            </FormGroup>
                            {
                                this.state.monedas &&
                                <FormGroup>
                                    <Label>Moneda</Label>
                                    <Input type="select" name="select" id="moneda" defaultValue={moneda.idMoneda}>
                                        {this.renderMoneda(this.state.monedas)}
                                    </Input>
                                </FormGroup>
                            }
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Descripcion</Label>
                                <Input type="text" id="descripcion" placeholder="Ingresa la descripcion" invalid={this.state.invalidDescripcion} defaultValue={descripcion} />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Importe</Label>
                                <Input type="number" id="importe" placeholder="Ingresa el importe" invalid={this.state.invalidImporte} defaultValue={importe} />
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