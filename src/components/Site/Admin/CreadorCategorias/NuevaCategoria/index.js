import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { Select } from 'antd';
import { Component } from 'react';
import { validateInputText } from './../../../../../helpers/validator';
const { Option } = Select;

class NuevaCategoria extends Component {

    constructor() {
        super();
        this.state = {
            selectedCr: [],
            invalidDetalle: false
        }
    }

    onChange = (selectedCr) => {
        console.log(selectedCr);
        this.setState({ selectedCr: selectedCr.map(num => parseInt(num))});
    }

    onSubmit = () => {
        let descripcion = document.getElementById("descripcion").value || "";
        this.setState({ invalidDetalle: false, invalidImporte: false });
        let crPadre = this.state.selectedCr;
        if (validateInputText(descripcion)) {
            this.props.agregarCategoria({
                descripcion,
                "entidadjuridica": {
                    "idEntidadJuridica": parseInt(localStorage.getItem("entJuridica"))
                },
                criterios: this.state.selectedCr.map(categoria => {
                    return{"idcriteriopresupuesto": categoria};
                })
            });
        } else {
            this.setState({ invalidDetalle: true });
        }
    }

    renderCategorias = (data) => {
        return data.map(e => (
            <Option value={e.idcriteriopresupuesto} key={e.idcriteriopresupuesto}>{`${e.descripcion}`}</Option>
        ));
    }

    render() {

        const renderFooter = (
            <div>
                <Button color="primary" onClick={this.onSubmit}>Crear</Button>
            </div>
        );

        return (
            <Dialog header="Crear Categoria" visible={this.props.visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => this.props.onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" id="descripcion" placeholder="Ingresa un nombre para el Categoría" />
                        {
                            this.state.invalidDetalle &&
                            <FormFeedback>Ingrese un nombre válido</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="crPadre">Criterio</Label>
                        <Select
                            mode="multiple"
                            placeholder="Ingresa las categorias"
                            value={this.state.selectedItems}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            bordered={true}
                            filterOption={(input, option) => 
                            option.children.toLowercase().indexOf(input.toLowercase()) >= 0}
                        >
                            {this.renderCategorias(this.props.criterios)}
                        </Select>
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}

export default NuevaCategoria;