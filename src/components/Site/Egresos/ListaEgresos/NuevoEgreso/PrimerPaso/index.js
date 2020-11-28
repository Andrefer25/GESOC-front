import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button, Table, FormFeedback } from 'reactstrap';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { validateInputText, validateInputNumber } from './../../../../../../helpers/validator';
import { getIndexMoneda } from './../../../../../../helpers/utils';

class PrimerPaso extends Component {

    constructor() {
        super();
        this.state = {
            selectedIndex: null,
            listaPresupuesto: [],
            invalidDetalle: false,
            invalidImporte: false
        }
    }

    componentDidMount = () => {
        let { lista } = this.props;
        if(lista.length > 0) {
            this.setState({listaPresupuesto: lista})
        }
    }

    renderTabla = (data) => {
        let {monedas} = this.props;
        return data.map((e, index) => {
            let moneda = getIndexMoneda(monedas, e.moneda.idMoneda);
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{e.detalles}</td>
                    <td>{monedas[moneda].id}</td>
                    <td>{`$${e.importe}`}</td>
                    <td><Button className="crudButton" color="primary" onClick={() => this.editarPresupuesto(index)}><FiEdit2 className="buttonIconCrud"/></Button></td>
                    <td><Button className="crudButton" color="danger" onClick={() => this.borrarPresupuesto(index)}><RiDeleteBin6Line className="buttonIconCrud"/></Button></td>
                </tr>
            )
        })
    }

    renderMoneda = (data) => {
        return data.map(e => (
            <option value={e.idMoneda} key={e.idMoneda}>{`${e.descripcion} (${e.simbolo})`}</option>
        ));
    }

    onSubmit = () => {
        let detalles = document.getElementById("detalle").value || "";
        let importe = parseInt(document.getElementById("importe").value) || "";
        let moneda = { idMoneda: parseInt(document.getElementById("moneda").value) };
        this.setState({ invalidDetalle: false, invalidImporte: false });
        if(validateInputNumber(importe) && validateInputText(detalles)) {
            if(this.state.selectedIndex === null)
                this.agregarPresupuesto({ detalles, importe, moneda });
            else {
                this.actualizarPresupuesto({ detalles, importe, moneda }, this.state.selectedIndex);
            }
        } else {
            if(!validateInputText(detalles)) {
                this.setState({ invalidDetalle: true });
            }
            if(!validateInputNumber(importe)) {
                this.setState({ invalidImporte: true });
            }
        }
    }

    agregarPresupuesto = (data) => {
        let lista = this.state.listaPresupuesto;
        lista.push(data);

        this.setState({listaPresupuesto: lista});
        document.getElementById("detalle").value = "";
        document.getElementById("importe").value = "";

        this.props.updatePresupuestos(this.props.index, lista);
    }

    editarPresupuesto = (index) => {
        let presupuesto = this.state.listaPresupuesto[index];
        document.getElementById("detalle").value = presupuesto.detalles;
        document.getElementById("importe").value = parseInt(presupuesto.importe);
        document.getElementById("moneda").value = presupuesto.moneda.idMoneda;
        this.setState({ selectedIndex: index});
    }
    
    actualizarPresupuesto = (data) => {
        let lista = this.state.listaPresupuesto;
        lista[this.state.selectedIndex] = data;
        document.getElementById("detalle").value = "";
        document.getElementById("importe").value = "";
        document.getElementById("moneda").moneda = 0;

        this.setState({listaPresupuesto: lista, selectedIndex: null});
        this.props.updatePresupuestos(this.props.index, lista);
    }

    borrarPresupuesto = (index) => {
        let lista = this.state.listaPresupuesto;
        lista.splice(index, 1);

        this.setState({listaPresupuesto: lista});
        this.props.updatePresupuestos(this.props.index, lista);
    }

    render() {
        let { listaPresupuesto } = this.state;
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Detalle</Label>
                                <Input type="text" id="detalle" placeholder="Ingresa los detalles" invalid={this.state.invalidDetalle} />
                                {
                                    this.state.invalidDetalle &&
                                    <FormFeedback>Ingrese un detalle válido</FormFeedback>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Moneda</Label>
                                <Input type="select" name="select" id="moneda">
                                    {this.renderMoneda(this.props.monedas)}
                                </Input>
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
                        <Col md={1}></Col>
                        <Col md={7}>
                            <Table size="sm" responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Detalles</th>
                                    <th>Moneda</th>
                                    <th>Importe</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(listaPresupuesto.length > 0) && 
                                    this.renderTabla(listaPresupuesto)}
                                </tbody>
                            </Table>
                            {(listaPresupuesto.length === 0) &&
                            <p>No hay presupuestos cargados</p>
                            }
                        </Col>
                    </Row>
                </Form>
                <Button onClick={this.onSubmit} color="primary">Agregar</Button>
            </div>
        );
    }
}

export default PrimerPaso;