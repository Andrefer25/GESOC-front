import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Button, Table } from 'reactstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Select } from 'antd';
const { Option } = Select;

class PrimerPaso extends Component {

    constructor() {
        super();
        this.state = {
            listaPresupuesto: [],
            presupuestoSel: null
        }
    }

    componentDidMount = () => {
        let { lista } = this.props;
        if(lista.length > 0) {
            this.setState({listaPresupuesto: lista})
        }
    }

    getPresupuestoByID = (index) => {
        let { presupuestos } = this.props;
        if(presupuestos.length > 0) {
            let presupuesto = null;
            presupuestos.forEach(e => {
                if(e.idPresupuesto === index) 
                    presupuesto = e;
            })
            return presupuesto;
        }
        return null;
    }

    renderTabla = (data) => {
        return data.map((e, index) => {
            let pres = this.getPresupuestoByID(e);
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{pres.detalles}</td>
                    <td>{pres.moneda}</td>
                    <td>{`${pres.importe}`}</td>
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
        let presupuesto = parseInt(this.state.presupuestoSel);
        let lista = this.state.listaPresupuesto;
        lista.push(presupuesto);
        this.setState({listaPresupuesto: lista});

        this.props.updatePresupuestos(this.props.index, lista);
    }

    renderPresupuestos = (data) => {
        return data.map(e => (
            <Option value={e.idPresupuesto} key={e.idPresupuesto}>{`${e.detalles} - ${e.moneda} ${e.importe}`}</Option>
        ));
    }

    borrarPresupuesto = (index) => {
        let lista = this.state.listaPresupuesto;
        lista.splice(index, 1);

        this.setState({listaPresupuesto: lista});
        this.props.updatePresupuestos(this.props.index, lista);
    }

    onSelectItem = (presupuestoSel) => {
        this.setState({ presupuestoSel })
    }

    render() {
        let { listaPresupuesto } = this.state;
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Item</Label>
                                <Select
                                    id="presupuestos"
                                    showSearch
                                    style={{width:"100%"}}
                                    placeholder="Ingrese el detalle del presupuesto"
                                    optionFilterProp="children"
                                    onChange={this.onSelectItem}
                                    bordered={true}                                    
                                    filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.renderPresupuestos(this.props.presupuestos)}
                                </Select>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <Button style={{margin: "2em 0 0 1em"}} onClick={this.onSubmit} color="primary">Agregar</Button>
                        </Col>
                        <Col md={12}>
                            <Table size="sm" responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Detalles</th>
                                    <th>Moneda</th>
                                    <th>Importe</th>
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
            </div>
        );
    }
}

export default PrimerPaso;