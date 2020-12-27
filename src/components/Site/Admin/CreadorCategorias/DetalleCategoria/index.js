import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { Select } from 'antd';
import { Component } from 'react';
import { validateInputText } from './../../../../../helpers/validator';
const { Option } = Select;

class DetalleCategoria extends Component {

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
        let idCategoriaPresupuesto = parseInt(this.props.dataInfo.idCategoriaPresupuesto);
        let crPadre = this.state.selectedCr;
        if(validateInputText(descripcion)) {
            this.props.actualizarCategoria({ 
                idCategoriaPresupuesto,
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

    renderCriterios = (data) => {
        return data.map(e => (
            <Option value={e.idCategoriaPresupuesto} key={e.idCategoriaPresupuesto}>{`${e.descripcion}`}</Option>
        ));
    }

    render() {   
        
        let { idCategoriaPresupuesto, descripcion, criterioDetalle } = this.props.dataInfo;

        const renderFooter = (
            <div>
                <Button color="primary" onClick={this.onSubmit}>Actualizar</Button>
            </div>
        );

        return (
            <Dialog header={`Detalle categoria ${idCategoriaPresupuesto}`}  visible={this.props.visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => this.props.onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" id="descripcion" placeholder="Ingresa un nombre para el criterio" defaultValue={descripcion} disabled />
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
                            placeholder="Ingrese el criterio padre"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            bordered={true}
                            value={criterioDetalle || ""}
                            disabled={true}
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

export default DetalleCategoria;