import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { validateInputText } from './../../../../../helpers/validator';

class NuevaEntidadBase extends Component {

    constructor() {
        super();
        this.state = {
            invalidNombre: false,
            invalidDesc: false
        }
    }

    onSubmit = async () => {
        let nombre = document.getElementById("ebNombre").value || "";
        let descripcion = document.getElementById("ebDescripcion").value || "";
        this.setState({ invalidNombre: false, invalidDesc: false });
        if(validateInputText(nombre) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                "desc": descripcion,
                "nombre": nombre
            })
        } else {
            if(!validateInputText(nombre)) {
                this.setState({ invalidNombre: true });
            }
            if(!validateInputText(descripcion)) {
                this.setState({ invalidDesc: true });
            }
        }
    }

    render() {
    
        let {visible, onHide} = this.props;
    
        const renderFooter = (
            <div>
                <Button color="primary" onClick={this.onSubmit}>Crear</Button>
            </div>
        );
    
        return (
            <Dialog header="Crear entidad base"  visible={visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Nombre Ficticio</Label>
                        <Input type="text" id="ebNombre" placeholder="Ingresa un nombre ficticio" invalid={this.state.invalidNombre} />
                        {
                            this.state.invalidNombre &&
                            <FormFeedback>Ingrese un nombre ficticio válido</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripcion</Label>
                        <Input type="text" id="ebDescripcion" placeholder="Ingresa una descripcion" invalid={this.state.invalidDesc} />
                        {
                            this.state.invalidDesc &&
                            <FormFeedback>Ingrese una descripción válida</FormFeedback>
                        }
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}


export default NuevaEntidadBase;