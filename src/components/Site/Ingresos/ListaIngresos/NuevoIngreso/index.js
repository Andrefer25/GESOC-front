import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
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
        let descripcion = document.getElementById("descripcion").value || "";
        let importe = document.getElementById("importe").value || "";
        let moneda = {idMoneda: parseInt(document.getElementById("moneda").value)};
        this.setState({ invalidImporte: false, invalidDescripcion: false });
        if(validateInputNumber(importe) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                entidadjuridica: { idEntidadJuridica: parseInt(localStorage.getItem("entJuridica")) },
                importe: parseInt(importe), 
                descripcion, 
                moneda
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
            <Dialog header="Nuevo Ingreso" visible={this.props.visible} style={{ width: '30vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input type="text" id="descripcion" placeholder="Ingresa la descripción" invalid={this.state.invalidDescripcion} />
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
                    <FormGroup>
                        <Label>Importe</Label>
                        <Input type="number" id="importe" placeholder="Ingresa el importe" invalid={this.state.invalidImporte} />
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