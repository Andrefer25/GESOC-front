import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
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
            {/* <Button color="primary" onClick={this.onSubmit}>Guardar</Button> */}
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
        let { idIngreso, descripcion, importe, moneda } = this.props.data;
        return (
            <Dialog header={`Detalles Ingreso ${idIngreso}`} visible={this.props.visible} style={{ width: '30vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input type="text" id="descripcion" placeholder="Ingresa la descripción" invalid={this.state.invalidDescripcion} defaultValue={descripcion} disabled />
                        {
                            this.state.invalidDescripcion &&
                            <FormFeedback>Ingrese una descripción válida</FormFeedback>
                        }
                    </FormGroup>
                    {
                        this.state.monedas &&
                        <FormGroup>
                            <Label>Moneda</Label>
                            {
                                this.state.monedas &&
                                <Input type="select" name="select" id="moneda" defaultValue={moneda.idMoneda} disabled>
                                    {
                                        this.renderMoneda(this.state.monedas)
                                    }
                                </Input>
                            }
                        </FormGroup>
                    }
                    <FormGroup>
                        <Label>Importe</Label>
                        <Input type="number" id="importe" placeholder="Ingresa el importe" invalid={this.state.invalidImporte} defaultValue={importe} disabled />
                        {
                            this.state.invalidImporte &&
                            <FormFeedback>Ingrese un importe válido</FormFeedback>
                        }
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}