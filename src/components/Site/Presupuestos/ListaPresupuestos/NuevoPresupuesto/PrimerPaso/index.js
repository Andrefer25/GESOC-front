import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button, Table, FormFeedback } from 'reactstrap';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { validateInputNumber } from './../../../../../../helpers/validator';
import { Select } from 'antd';
const { Option } = Select;

class PrimerPaso extends Component {

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            listaItems: [],
            invalidCantidad: false,
            invalidImporte: false,
            itemSeleccionado: null
        }
    }

    componentDidMount = () => {
        let { lista } = this.props;
        if(lista.length > 0) {
            this.setState({listaItems: lista})
        }
    }

    getItemByID = (index) => {
        let { data } = this.props;
        if(data.length > 0) {
            let item = null;
            data.forEach(e => {
                if(e.idItem === index) 
                    item = e;
            })
            return item;
        }
        return null;
    }

    renderTabla = (data) => {
        return data.map((e, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{this.getItemByID(e.idItem).descripcion}</td>
                    <td>{e.cantidad}</td>
                    <td>{e.valorUnitario}</td>
                    <td><Button className="crudButton" color="primary" onClick={() => this.editarItem(index)}><FiEdit2 className="buttonIconCrud"/></Button></td>
                    <td><Button className="crudButton" color="danger" onClick={() => this.borrarItem(index)}><RiDeleteBin6Line className="buttonIconCrud"/></Button></td>
                </tr>
            )
        })
    }

    onSubmit = () => {
        let cantidad = parseInt(document.getElementById("cantidad").value) || "";
        let valorUnitario = parseFloat(document.getElementById("valorUnitario").value) || "";
        let idItem = parseInt(this.state.itemSeleccionado);
        this.setState({ invalidCantidad: false, invalidImporte: false });
        if(validateInputNumber(cantidad) && validateInputNumber(valorUnitario)) {
            if(this.state.selectedIndex === null)
                this.agregarItem({ idItem, cantidad, valorUnitario });
            else {
                this.actualizarItem({ idItem, cantidad, valorUnitario }, this.state.selectedIndex);
            }
        } else {
            if(!validateInputNumber(cantidad)) {
                this.setState({ invalidCantidad: true });
            }
            if(!validateInputNumber(valorUnitario)) {
                this.setState({ invalidImporte: true });
            }
        }
    }

    agregarItem = (data) => {
        let lista = this.state.listaItems;
        lista.push(data);

        this.setState({listaItems: lista});
        document.getElementById("cantidad").value = "";
        document.getElementById("valorUnitario").value = "";
        document.getElementById("idItem").value = "";
        this.props.updateItems(this.props.index, lista);
    }

    editarItem = (index) => {
        let item = this.state.listaItems[index];
        document.getElementById("cantidad").value = item.cantidad;
        document.getElementById("valorUnitario").value = parseInt(item.valorUnitario);
        document.getElementById("idItem").value = item.idItem;
        this.setState({ selectedIndex: index});
    }
    
    actualizarItem = (data) => {
        let lista = this.state.listaItems;
        lista[this.state.selectedIndex] = data;
        document.getElementById("cantidad").value = "";
        document.getElementById("valorUnitario").value = "";
        document.getElementById("idItem").value = "";
        this.setState({listaItems: lista, selectedIndex: null});
        this.props.updateItems(this.props.index, lista);
    }

    borrarItem = (index) => {
        let lista = this.state.listaItems;
        lista.splice(index, 1);

        this.setState({listaItems: lista});
        this.props.updateItems(this.props.index, lista);
    }

    renderItems = (data) => {
        return data.map(e => (
            <Option value={e.idItem} key={e.idItem}>{`${e.descripcion} - Precio x1 ${e.valorUnitario}`}</Option>
        ));
    }

    onSelectItem = (value) => {
        let item = this.getItemByID(parseInt(value));
        document.getElementById("valorUnitario").value = item.valorUnitario;
        this.setState({ itemSeleccionado: value });
    }

    render() {
        let { listaItems } = this.state;
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Item</Label>
                                <Select
                                    id="idItem"
                                    showSearch
                                    style={{width:"100%"}}
                                    placeholder="Ingrese el nombre del item"
                                    optionFilterProp="children"
                                    onChange={this.onSelectItem}
                                    bordered={true}                                    
                                    filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.renderItems(this.props.data)}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>Cantidad</Label>
                                <Input type="number" id="cantidad" placeholder="Ingresa la cantidad" invalid={this.state.invalidCantidad} />
                                {
                                    this.state.invalidCantidad &&
                                    <FormFeedback>Ingrese una cantidad válida</FormFeedback>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Valor Unitario</Label>
                                <Input type="number" id="valorUnitario" placeholder="Ingresa el valor" invalid={this.state.invalidImporte} />
                                {
                                    this.state.invalidImporte &&
                                    <FormFeedback>Ingrese un valor válido</FormFeedback>
                                }
                            </FormGroup>
                        </Col>
                        <Col md={1}></Col>
                        <Col md={7}>
                            <Table size="sm" responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>Cantidad</th>
                                    <th>Valor</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(listaItems.length > 0) && 
                                    this.renderTabla(listaItems)}
                                </tbody>
                            </Table>
                            {(listaItems.length === 0) &&
                            <p>No hay Items cargados</p>
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