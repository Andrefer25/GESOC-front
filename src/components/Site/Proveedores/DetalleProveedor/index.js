import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { validateInputNumber, validateInputText } from '../../../../helpers/validator';

class DetalleItem extends Component {

    constructor() {
        super();
        this.state = {
            invalidCuit: false,
            invalidNombre: false
        }
    }

    onSubmit = async () => {
        let cuit = parseFloat(document.getElementById("cuit").value) || "";
        let nombre = document.getElementById("nombre").value || "";
        this.setState({ invalidCuit: false, invalidNombre: false });
        if(validateInputNumber(cuit) && validateInputText(nombre)) {
            await this.props.onSubmit({
                cuit,
                nombre,
                idProveedor: this.props.idProveedor
            })
        } else {
            if(!validateInputNumber(cuit)) {
                this.setState({ invalidCuit: true });
            }
            if(!validateInputText(nombre)) {
                this.setState({ invalidNombre: true });
            }
        }
    }

    render() {
    
        let {visible, onHide} = this.props;

        let { idProveedor, nombre, cuit } = this.props.data;

        return (
            <Dialog header={`Detalles Proveedor ${idProveedor}`}  visible={visible} style={{ width: '30vw' }} onHide={() => onHide()}>
                <Form>
                    <FormGroup>
                        <Label>CUIT</Label>
                        <Input type="text" id="cuit" placeholder="Ingrese el CUIT" invalid={this.state.invalidCuit} defaultValue={cuit} disabled />
                        {
                            this.state.invalidCuit &&
                            <FormFeedback>Ingrese un CUIT válido</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" id="nombre" placeholder="Ingresa el nombre" invalid={this.state.invalidNombre} defaultValue={nombre} disabled />
                        {
                            this.state.invalidNombre &&
                            <FormFeedback>Ingrese un nombre válido</FormFeedback>
                        }
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}


export default DetalleItem;