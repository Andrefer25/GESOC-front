import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { Select } from 'antd';
import { Component } from 'react';
import { validateInputText } from './../../../../../helpers/validator';
const { Option } = Select;

class NuevoCriterio extends Component {

    constructor() {
        super();
        this.state = {
            selectedCr: null,
            invalidDetalle: false
        }
    }

    onChange = (selectedCr) => {
        this.setState({ selectedCr });
    }

    renderFooter = (
        <div>
            <Button color="primary">Crear</Button>
        </div>
    );

    onSubmit = () => {
        let descripcion = parseInt(document.getElementById("descripcion").value) || "";
        this.setState({ invalidDetalle: false, invalidImporte: false });
        if(validateInputText(descripcion)) {
            if(this.state.selectedIndex === null)
                this.agregarItem({ descripcion });
        } else {
            this.setState({ invalidDetalle: true });
        }
    }

    renderCriterios = (data) => {
        return data.map(e => (
            <Option value={e.idcriteriopresupuesto} key={e.idcriteriopresupuesto}>{`${e.descripcion}`}</Option>
        ));
    }

    render() {     
        return (
            <Dialog header="Crear criterio"  visible={this.props.visible} style={{ width: '30vw' }} footer={this.renderFooter} onHide={() => this.props.onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" id="crNombre" placeholder="Ingresa un nombre para el criterio" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="crPadre">Criterio Padre (Opcional)</Label>
                        <Select
                            id="crPadre"
                            showSearch
                            style={{width:"100%"}}
                            placeholder="Ingrese el criterio padre"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            bordered={true}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.renderCriterios(this.props.data)}
                        </Select>
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}

export default NuevoCriterio;