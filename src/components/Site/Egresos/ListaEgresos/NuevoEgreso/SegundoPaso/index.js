import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { validateInputText, validateInputNumber } from './../../../../../../helpers/validator';
import { Select } from 'antd';

class PrimerPaso extends Component {
    
    constructor() {
        super();
        this.state = {
            invalidInsPago: false,
            invalidDescripcion: false,
            indexElegido: 0,
            selectedItems: [],
        }
    }

    handleChangeCategoria = selectedItems => {
        console.log(selectedItems);
        this.setState({ selectedItems });
    };

    renderPresupuestos = (data) => {
        return data.map((e, index) => (
            <option value={index} key={index}>{`${e.detalles}`}</option>
        ));
    }

    renderMediosDePago = (data) => {
        return data.map(e => (
            <option value={e.idmediodepago} key={e.idmediodepago}>{e.descripcion}</option>
        ));
    }

    renderCategorias = (data) => {
        return data.map(e => (
            <option value={e.idCategoriaPresupuesto} key={e.idCategoriaPresupuesto}>{`${e.descripcion}`}</option>
        ));
    }

    renderCategorias = (data) => {
        return data.map(e => (
            <Select.Option value={e.idCategoriaPresupuesto} key={e.idCategoriaPresupuesto}>{`${e.descripcion}`}</Select.Option>
        ));
    }

    renderMoneda = (data) => {
        return data.map(e => (
            <option value={e.idMoneda} key={e.idMoneda}>{`${e.descripcion} (${e.simbolo})`}</option>
        ));
    }

    onChangePresupuesto = () => {
        let index = parseInt(document.getElementById("presupuesto").value);
        this.setState({indexElegido: index});
        document.getElementById("importe").value = this.props.lista[index].importe;
        document.getElementById("moneda").value = this.props.lista[index].idMoneda;
    }

    onSubmit = () => {
        let numInst = parseInt(document.getElementById("numInst").value) || "";
        let desc = document.getElementById("desc").value || "";
        this.setState({ invalidInsPago: false, invalidDescripcion: false });
        if(validateInputNumber(numInst) && validateInputText(desc)) {
            this.agregarEgreso({ numInst, desc });
        } else {
            if(!validateInputText(desc)) {
                this.setState({ invalidDescripcion: true });
            }
            if(!validateInputNumber(numInst)) {
                this.setState({ invalidInsPago: true });
            }
        }
    }

    agregarEgreso = ({numInst, desc}) => {
        let egreso = {
            importe: parseInt(document.getElementById("importe").value),
            numeroInstrumentoPago: parseInt(numInst),
            descripcion: desc,
            moneda: { idMoneda: parseInt(document.getElementById("moneda").value) },
            mediodepago: {idmediodepago: parseInt(document.getElementById("medioPago").value) },
            usuario: { idUsuario: parseInt(localStorage.getItem("idUsuario")) },
            entidadjuridica: { idEntidadJuridica: parseInt(localStorage.getItem("entJuridica")) },
            presupuestoSeleccionado: this.props.lista[this.state.indexElegido].idPresupuesto,
            categorias: this.state.selectedItems
        }

        this.props.insertData(egreso);
    }

    render() {
        let { lista, listaCategorias } = this.props;
        return (
            <div>

                <Form>
                    <Row form>
                        <Col md={6}>
                            {
                                listaCategorias &&
                                <FormGroup>
                                    <Label>Categorias</Label>
                                    <Select
                                        mode="multiple"
                                        placeholder="Ingresa las categorias"
                                        value={this.state.selectedItems}
                                        onChange={this.handleChangeCategoria}
                                        style={{ width: '100%' }}
                                    >
                                        {this.renderCategorias(listaCategorias)}
                                    </Select>
                                </FormGroup>
                            }
                            <FormGroup>
                                <Label>Medio de Pago</Label>
                                <Input type="select" name="select" id="medioPago">
                                    {this.renderMediosDePago(this.props.mediosPago)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Presupuesto Elegido</Label>
                                <Input type="select" name="select" id="presupuesto" onChange={this.onChangePresupuesto}>
                                    {this.renderPresupuestos(lista)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Número Instrumento de Pago</Label>
                                <Input type="number" id="numInst" placeholder="Ingresa número instrumento de pago" invalid={this.state.invalidInsPago} />
                                {
                                    this.state.invalidInsPago &&
                                    <FormFeedback>Ingrese un numero válido</FormFeedback>
                                }
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input type="text" id="desc" placeholder="Ingresa un descripción" invalid={this.state.invalidDescripcion} />
                                {
                                    this.state.invalidDescripcion &&
                                    <FormFeedback>Ingrese una descripción válida</FormFeedback>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Moneda</Label>
                                <Input type="select" name="select" id="moneda" defaultValue={lista[this.state.indexElegido].idMoneda} disabled>
                                    {this.renderMoneda(this.props.monedas)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Importe Total</Label>
                                <Input type="text" id="importe" defaultValue={lista[this.state.indexElegido].importe} disabled />
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