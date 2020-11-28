import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { validateInputNumber, validateInputText } from './../../../../../helpers/validator';
import MediosDePagoService from './../../../../../services/MediosDePagoService';


export default class NuevoIngreso extends Component {

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
            <Button color="primary" onClick={this.onSubmit}>Crear</Button>
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

    onSubmit = async () => {
        let clienteId = document.getElementById("clienteId").value || "";
        let descripcion = document.getElementById("descripcion").value || "";
        let importe = document.getElementById("importe").value || "";
        let moneda = {idMoneda: parseInt(document.getElementById("moneda").value)};
        this.setState({ invalidInsPago: false, invalidDescripcion: false });
        if(validateInputNumber(clienteId) && validateInputNumber(importe) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                importe: parseInt(importe), descripcion, clienteId: parseInt(clienteId), moneda
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
        return (
            <Dialog header="Nuevo Ingreso" visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>ID Cliente</Label>
                                <Input type="number" id="clienteId" placeholder="Ingresa el ID" invalid={this.state.invalidID} />
                                {
                                    this.state.invalidID &&
                                    <FormFeedback>Ingrese un ID válido</FormFeedback>
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
                            <FormGroup>
                                <Label>Descripcion</Label>
                                <Input type="text" id="descripcion" placeholder="Ingresa la descripcion" invalid={this.state.invalidDescripcion} />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
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