import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { validateInputText } from './../../../../../helpers/validator';
import MediosDePagoService from './../../../../../services/MediosDePagoService';
import PresupuestoService from '../../../../../services/PresupuestoService';
import UsuarioService from '../../../../../services/UserService';
import { Select } from 'antd';
import { Toast } from 'primereact/toast';

export default class DetalleEgreso extends Component {

    constructor() {
        super();
        this.service = new MediosDePagoService();
        this.presupuestoService = new PresupuestoService();
        this.usuarioService = new UsuarioService();
        this.state = {
            invalidDescripcion: false,
            invalidImporte: false,
            mediosPago: null,
            monedas: null,
            presupuestos: null,
            usuarios: null,
            documentoSeleccionado: null,
            uploadDisabled: true,
            revisoresDisabled: true,
            selectedItems: [],
            cambiarDoc: false
        }
    }

    handleChange = selectedItems => {
        this.setState({ selectedItems, revisoresDisabled: !selectedItems.length>0 });
    };

    handleChangeCategorias = selectedItems => {
        
    };

    renderFooter = () => (
        <div>
            {/* <Button color="primary" onClick={this.onSubmit}>Guardar</Button> */}
        </div>
    );

    showSuccess = () => {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError = () => {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

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

    renderCategorias = (data) => {
        return data.map(e => (
            <Select.Option value={e.idCategoriaPresupuesto} key={e.idCategoriaPresupuesto}>{`${e.descripcion}`}</Select.Option>
        ));
    }

    renderPresupuestos = (data) => {
        return data.map((e, index) => (
            <option value={index} key={index}>{`${e.detalles}`}</option>
        ));
    }

    renderUsuarios = (data) => {
        return data.map(e => (
            <Select.Option value={e.idUsuario} key={e.idUsuario}>{`${e.nombre} ${e.apellido} (${e.nombreUsuario})`}</Select.Option>
        ))
    }

    renderCriterios = (data) => {
        return data.map(e => (
            <Select.Option value={e.idCriterioPresupuesto} key={e.idCriterioPresupuesto}>{`${e.nombreCriterioPresupuesto}`}</Select.Option>
        ))
    }

    getPresupuestosElegidos = (presupuestos) => {
        let lista = this.state.presupuestos.filter(e => presupuestos.indexOf(e.idPresupuesto) !== -1);
        return lista;
    }

    componentDidMount = async () => {
        this.getMediosPago().then(async () => {
           this.getPresupuestos().then(async () => {
                this.getMonedas().then(async () => {
                    await this.getUsuarios()
                })
           })
        });
        
    }

    getMediosPago = async () => {
        let mediosPago = await this.service.getMediosPago();

        this.setState({ mediosPago });
    }

    getMonedas = async() => {
        let monedas = await this.service.getMonedas();

        this.setState({ monedas });
    }

    getUsuarios = async() => {
        let usuarios = await this.usuarioService.getUsuarios();
        this.setState({ usuarios });
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
        let descripcion = document.getElementById("descripcion").value || "";
        let idEgreso = parseInt(this.props.data.idEgreso);
        let mediodepago = {idmediodepago: parseInt(document.getElementById("medioPago").value)};
        this.setState({ invalidDescripcion: false });
        if(validateInputText(descripcion)) {
            await this.props.onSubmit({
                descripcion, idEgreso, mediodepago, importe: this.props.data.importe
            })
        } else {
            if(!validateInputText(descripcion)) {
                this.setState({ invalidDescripcion: true });
            }
        }
    }

    uploadDocument = () => {
        let doc = this.state.documentoSeleccionado;
        this.setState({ cambiarDoc: false });
        this.props.subirDocumento(doc, this.props.data.idEgreso);
    }

    onDocumentChange = (event) => {
        this.setState({
            documentoSeleccionado: event.target.files[0],
            uploadDisabled: false
        })
    }

    hideDetalle = () => {
        this.setState({ uploadDisabled: true, documentoSeleccionado: null, selectedItems: [] })
        this.props.onHide();
    }

    openInNewTab(url) {
        window.open(url, '_blank');
    }

    filterUsers(users) {
        let selected = this.state.selectedItems;
        return users.filter(e => !selected.includes(e.idUsuario));
    }

    agregarRevisor = async () => {
        let selected = this.state.selectedItems;
        let revisores = selected.map(e => ({idUsuario: e}));
        let data = { revisores };
        let idEgreso = this.props.data.idEgreso;
        await this.setRevisores(data, idEgreso);
    }

    setRevisores = (data, id) => {
        this.usuarioService.insertRevisores(data,id).then(response => {
            if(response) {
                this.showSuccess();
            } else {
                this.showError();
            }  
            this.setState({  selectedItems: [] })
            this.props.revisores();
        })
    }

    cambiarDocumento = () => {
        this.setState({ cambiarDoc: !this.state.cambiarDoc });
    }

    render() {
        let { idEgreso, descripcion, importe, moneda, mediodepago, presupuestoSeleccionado, presupuestos, docCom, revisores, categorias, criterios } = this.props.data;
        let { listaCategorias } = this.props;
        let { selectedItems, cambiarDoc } = this.state;
        let disabledRevisores = (revisores.length > 0);
        if(revisores.length > 0) {
            selectedItems = revisores;
        }
        let selectedCriterios = criterios.map(e => e.idCriterioPresupuesto);

        return (
            <Dialog header={`Detalles Egreso ${idEgreso}`} visible={this.props.visible} style={{ width: '60vw' }} footer={this.renderFooter()} onHide={this.hideDetalle}>
                <Toast ref={(el) => this.toast = el} />
                <Form>
                    <Row form>
                        <Col md={6}>
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
                                listaCategorias &&
                                <FormGroup>
                                    <Label>Categorias</Label>
                                    <Select
                                        mode="multiple"
                                        placeholder="Ingresa las categorias"
                                        value={categorias}
                                        onChange={this.handleChangeCategoria}
                                        style={{ width: '100%' }}
                                        disabled
                                    >
                                        {this.renderCategorias(listaCategorias)}
                                    </Select>
                                </FormGroup>
                            }
                            {
                                !docCom &&
                                <React.Fragment>
                                    <FormGroup>
                                        <Label>Documento Comercial</Label>
                                        <Input type="file" id="docCom" onChange={this.onDocumentChange} />
                                    </FormGroup>
                                    <Button color="primary" disabled={this.state.uploadDisabled} onClick={this.uploadDocument}>Subir documento</Button>
                                </React.Fragment>
                            }
                            {   docCom && !cambiarDoc &&
                                <React.Fragment>
                                    <Button color="primary" href={"http://localhost:9000/download/"+docCom} target="_blank" style={{marginTop:"1em"}}>Descargar documento</Button>
                                    <Button color="danger" style={{marginLeft:".5em", marginTop:"1em"}} onClick={this.cambiarDocumento}>Cambiar documento</Button>
                                </React.Fragment>
                            }
                            {
                                cambiarDoc &&
                                <React.Fragment>
                                    <FormGroup>
                                        <Label>Documento Comercial</Label>
                                        <Input type="file" id="docCom" onChange={this.onDocumentChange} />
                                    </FormGroup>
                                    <Button color="primary" disabled={this.state.uploadDisabled} onClick={this.uploadDocument}>Subir documento</Button>
                                    <Button color="danger" style={{marginLeft:".5em"}} onClick={this.cambiarDocumento}>Cancelar</Button>
                                </React.Fragment>
                            }
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input type="text" id="descripcion" placeholder="Ingresa la descripción" invalid={this.state.invalidDescripcion} defaultValue={descripcion} disabled />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
                            {
                                this.state.mediosPago &&
                                <FormGroup>
                                    <Label>Medio de Pago</Label>
                                    <Input type="select" name="select" id="medioPago" defaultValue={mediodepago} disabled>
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
                            {
                                this.state.usuarios &&
                                <React.Fragment>
                                    <FormGroup>
                                        <Label>Revisores</Label>
                                        <Select
                                            mode="multiple"
                                            placeholder="Ingrese el nombre de usuario"
                                            value={selectedItems}
                                            onChange={this.handleChange}
                                            style={{ width: '100%' }}
                                            disabled={disabledRevisores}
                                        >
                                            {this.renderUsuarios(this.state.usuarios)}
                                        </Select>
                                    </FormGroup>
                                    {
                                        !disabledRevisores &&
                                        <Button color="primary" disabled={this.state.revisoresDisabled} onClick={this.agregarRevisor}>Agregar revisores</Button>
                                    }
                                </React.Fragment>
                            }
                        </Col>
                    </Row>
                    {
                        criterios &&
                        <React.Fragment>
                            <FormGroup style={{marginTop:"0em"}}>
                                <Label>Criterios</Label>
                                <Select
                                    mode="multiple"
                                    value={selectedCriterios}
                                    onChange={this.handleChange}
                                    style={{ width: '100%' }}
                                    disabled={true}
                                >
                                    {this.renderCriterios(criterios)}
                                </Select>
                            </FormGroup>
                        </React.Fragment>
                    }
                </Form>
            </Dialog>
        )
    }
}