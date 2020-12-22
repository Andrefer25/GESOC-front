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
            selectedCr: null,
            invalidDetalle: false
        }
    }

    onChange = (selectedCr) => {
        this.setState({ selectedCr: parseInt(selectedCr) });
    }

    onSubmit = () => {
        let descripcion = document.getElementById("descripcion").value   || "";
        this.setState({ invalidDetalle: false, invalidImporte: false });
        let crPadre = this.state.selectedCr;
        if(validateInputText(descripcion)) {
            this.props.agregarCategoria({ 
                descripcion,
                "entidadjuridica": {
                    "idEntidadJuridica": parseInt(localStorage.getItem("entJuridica"))
                },
                "criteriopresupuesto": {"idcriteriopresupuesto": crPadre}
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
            <Dialog header="Crear Categoria"  visible={this.props.visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => this.props.onHide()}>
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
                            id="crPadre"
                            showSearch
                            style={{width:"100%"}}
                            placeholder="Ingrese el criterio"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            bordered={true}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
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