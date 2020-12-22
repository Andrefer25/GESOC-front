import React, {Component} from 'react';
import { Dialog } from 'primereact/dialog';
import { Col, Row, Form, FormGroup, Label, Input, Button, Table, FormFeedback } from 'reactstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { validateInputNumber } from './../../../../../helpers/validator';

class VincularOperacion extends Component {

    constructor(){
        super();
        this.state = {
            listaCriterios: [],
            invalidCantidad: false,
            selectedIndex: null,
            disableButton: true
        }
    }

    onSubmit = () => {
        let ordenamientoMayor = document.getElementById("ordenamientoMayor").value==="SI";
        let cantAsignacionesEficaces = parseInt(document.getElementById("cantAsignacionesEficaces").value) || "";
        let criterioVinculacion = document.getElementById("criterioVinculacion").value
        this.setState({ invalidCantidad: false });
        if(validateInputNumber(cantAsignacionesEficaces)) {
            if(this.state.selectedIndex === null)
                this.agregarCriterio({ criterioVinculacion, cantAsignacionesEficaces, ordenamientoMayor });
        } else {
            if(!validateInputNumber(cantAsignacionesEficaces)) {
                this.setState({ invalidCantidad: true });
            }
        }
    }

    agregarCriterio = (data) => {
        let lista = this.state.listaCriterios;
        lista.push(data);

        this.setState({listaCriterios: lista, disableButton: false});
        document.getElementById("cantAsignacionesEficaces").value = "";
    }

    borrarItem = (index) => {
        let lista = this.state.listaCriterios;
        lista.splice(index, 1);

        this.setState({listaCriterios: lista});

        if(lista.length === 0) {
            this.setState({ disableButton: true });
        }
    }

    renderTabla = (data) => {
        return data.map((e, index) => {
            return (
                <tr key={index}>
                    <td>{e.criterioVinculacion}</td>
                    <td>{e.cantAsignacionesEficaces}</td>
                    <td>{e.ordenamientoMayor? "SI":"NO"}</td>
                    <td><Button className="crudButton" color="danger" onClick={() => this.borrarItem(index)}><RiDeleteBin6Line className="buttonIconCrud"/></Button></td>
                </tr>
            )
        })
    }

    renderCriterios = (data) => {
        return data.map(e => (
            <option value={e.nombre} key={e.nombre}>{`${e.nombre}`}</option>
        ));
    }

    vincular = () => {
        let lista = this.state.listaCriterios;
        this.props.onSubmit(lista);
        this.props.onHide();
    }

    render() {
        const renderFooter = (
            <div>
                <Button color="primary" disabled={this.state.disableButton} onClick={this.vincular}>Vincular</Button>
            </div>
        );

        let { listaCriterios } = this.state;
    
        return (
            <Dialog header="Vincular operación" visible={this.props.visible} style={{ width: '60vw' }} footer={renderFooter} onHide={() => this.props.onHide()}>
                <div>
                    <Form>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Criterio de Vinculación</Label>
                                    <Input type="select" id="criterioVinculacion" placeholder="Ingresa el valor">
                                        {this.renderCriterios(this.props.criterios)}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Cantidad Asignaciones Eficaces</Label>
                                    <Input type="number" id="cantAsignacionesEficaces" placeholder="Ingresa la cantidad" invalid={this.state.invalidCantidad} />
                                    {
                                        this.state.invalidCantidad &&
                                        <FormFeedback>Ingrese una cantidad válida</FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label>Ordenamiento Mayor</Label>
                                    <Input type="select" id="ordenamientoMayor" placeholder="Ingresa el valor">
                                        <option value={"SI"}>Si</option>
                                        <option value={"NO"}>No</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={7}>
                                <Table size="sm" responsive>
                                    <thead>
                                        <tr>
                                        <th>Criterio</th>
                                        <th>Cantidad</th>
                                        <th>Ord. Mayor</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(listaCriterios.length > 0) && 
                                        this.renderTabla(listaCriterios)}
                                    </tbody>
                                </Table>
                                {(listaCriterios.length === 0) &&
                                <p>No hay Items cargados</p>
                                }
                            </Col>
                        </Row>
                    </Form>
                    <Button onClick={this.onSubmit} color="primary">Agregar</Button>
                </div>
            </Dialog>
        )
    }
}

export default VincularOperacion;