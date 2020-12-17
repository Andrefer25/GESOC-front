import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { validateInputNumber, validateInputText } from './../../../../../helpers/validator';
import MediosDePagoService from './../../../../../services/MediosDePagoService';
import PresupuestoService from '../../../../../services/PresupuestoService';

export default class DetalleEgreso extends Component {

    constructor() {
        super();
        this.service = new MediosDePagoService();
        this.presupuestoService = new PresupuestoService();
        this.state = {
            invalidNumIns: false,
            invalidDescripcion: false,
            invalidImporte: false,
            mediosPago: null,
            monedas: null,
            presupuestos: null,
            documentoSeleccionado: null,
            uploadDisabled: true
        }
    }

    renderFooter = () => (
        <div>
            <Button color="primary" onClick={this.onSubmit}>Guardar</Button>
            <Button color="danger" onClick={this.onDelete}>Borrar</Button>
        </div>
    );

    renderMedioPago = (data) => {
        return data.map(e => (
            <option value={e.idmediodepago} key={e.idmediodepago}>{e.descripcion}</option>
        ));
    }

    renderMoneda = (data) => {
        return data.map(e => (
            <option value={e.idMoneda} key={e.idMoneda}>{`${e.descripcion} (${e.simbolo})`}</option>
        ));
    }

    renderPresupuestos = (data) => {
        return data.map((e, index) => (
            <option value={index} key={index}>{`${e.detalles}`}</option>
        ));
    }

    getPresupuestosElegidos = (presupuestos) => {
        let lista = this.state.presupuestos.filter(e => presupuestos.indexOf(e.idPresupuesto) !== -1);
        return lista;
    }

    componentDidMount = async () => {
        this.getMediosPago().then(async () => {
            await this.getPresupuestos()
        });
    }

    getMediosPago = async () => {
        let mediosPago = await this.service.getMediosPago();
        let monedas = await this.service.getMonedas();

        this.setState({ mediosPago, monedas });
    }

    getPresupuestos = async() => {
        let presupuestos = await this.presupuestoService.getListaPresupuestos();

        this.setState({ presupuestos });
    }

    onDelete = async() => {
        let id = this.props.data.idEgreso;
        await this.props.borrarIngreso(id);
        this.props.onHide();
    }

    onSubmit = async () => {
        let numeroInstrumentoPago = document.getElementById("numeroInstrumentoPago").value || "";
        let descripcion = document.getElementById("descripcion").value || "";
        let idEgreso = parseInt(this.props.data.idEgreso);
        let mediodepago = {idmediodepago: parseInt(document.getElementById("medioPago").value)};
        this.setState({ invalidInsPago: false, invalidDescripcion: false });
        if(validateInputNumber(numeroInstrumentoPago) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                descripcion, numeroInstrumentoPago: parseInt(numeroInstrumentoPago), idEgreso, mediodepago, importe: this.props.data.importe
            })
        } else {
            if(!validateInputText(descripcion)) {
                this.setState({ invalidDescripcion: true });
            }
            if(!validateInputNumber(numeroInstrumentoPago)) {
                this.setState({ invalidNumIns: true });
            }
        }
    }

    uploadDocument = () => {
        let doc = this.state.documentoSeleccionado;
        this.props.subirDocumento(doc, this.props.data.idEgreso);
    }

    onDocumentChange = (event) => {
        this.setState({
            documentoSeleccionado: event.target.files[0],
            uploadDisabled: false
        })
    }

    hideDetalle = () => {
        this.setState({ uploadDisabled: true, documentoSeleccionado: null })
        this.props.onHide();
    }

    openInNewTab(url) {
        window.open(url, '_blank');
    }

    render() {
        let { idEgreso, descripcion, numeroInstrumentoPago, importe, moneda, mediodepago, presupuestoSeleccionado, presupuestos, docCom } = this.props.data;
        return (
            <Dialog header={`Detalles Egreso ${idEgreso}`} visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={this.hideDetalle}>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Número Instrumento de Pago</Label>
                                <Input type="number" id="numeroInstrumentoPago" placeholder="Ingresa el número de instrumento" invalid={this.state.invalidNumIns} defaultValue={numeroInstrumentoPago} />
                                {
                                    this.state.invalidNumIns &&
                                    <FormFeedback>Ingrese un número válido</FormFeedback>
                                }
                            </FormGroup>
                            {
                                this.state.monedas &&
                                <FormGroup>
                                    <Label>Moneda</Label>
                                    <Input type="select" name="select" id="moneda" defaultValue={moneda} disabled>
                                        {this.renderMoneda(this.state.monedas)}
                                    </Input>
                                </FormGroup>
                            }
                            <FormGroup>
                                <Label>Importe Total</Label>
                                <Input type="number" id="importe" defaultValue={importe} disabled />
                            </FormGroup>
                            {
                                !docCom?
                                <FormGroup>
                                    <Label>Documento Comercial</Label>
                                    <Input type="file" id="docCom" onChange={this.onDocumentChange} />
                                </FormGroup>:
                                <Button color="primary" href={"https://gesoctp.herokuapp.com/download/"+docCom} target="_blank">Descargar documento</Button>
                            }
                            {
                                !docCom &&
                                <Button color="primary" disabled={this.state.uploadDisabled} onClick={this.uploadDocument}>Subir documento</Button>
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
                            {
                                this.state.mediosPago &&
                                <FormGroup>
                                    <Label>Medio de Pago</Label>
                                    <Input type="select" name="select" id="medioPago" defaultValue={mediodepago}>
                                        {this.renderMedioPago(this.state.mediosPago)}
                                    </Input>
                                </FormGroup>
                            }
                            {
                                this.state.presupuestos &&
                                <FormGroup>
                                    <Label>Presupuesto Elegido</Label>
                                    <Input type="select" name="select" id="presupuesto" defaultValue={presupuestoSeleccionado} disabled>
                                        {this.renderPresupuestos(this.getPresupuestosElegidos(presupuestos))}
                                    </Input>
                                </FormGroup>
                            }
                        </Col>
                    </Row>
                </Form>
            </Dialog>
        )
    }
}