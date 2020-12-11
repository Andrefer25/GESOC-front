import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { validateInputNumber, validateInputText } from './../../../../helpers/validator';

class NuevoItem extends Component {

    constructor() {
        super();
        this.state = {
            invalidVal: false,
            invalidDesc: false
        }
    }

    onSubmit = async () => {
        let valorUnitario = parseFloat(document.getElementById("valorUnitario").value) || "";
        let descripcion = document.getElementById("descripcion").value || "";
        let productoServicio = document.getElementById("productoServicio").value;
        this.setState({ invalidVal: false, invalidDesc: false });
        if(validateInputNumber(valorUnitario) && validateInputText(descripcion)) {
            await this.props.onSubmit({
                valorUnitario,
                descripcion,
                productoServicio
            })
        } else {
            if(!validateInputNumber(valorUnitario)) {
                this.setState({ invalidVal: true });
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
            <Dialog header="Nuevo Item"  visible={visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Descripcion(nombre)</Label>
                        <Input type="text" id="descripcion" placeholder="Ingresa una descripcion" invalid={this.state.invalidDesc} />
                        {
                            this.state.invalidDesc &&
                            <FormFeedback>Ingrese una descripcion válida</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Tipo</Label>
                        <Input type="select" name="select" id="productoServicio">
                            <option value="Producto">Producto</option>
                            <option value="Servicio">Servicio</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Valor Unitario</Label>
                        <Input type="text" id="valorUnitario" placeholder="Ingrese un valor unitario" invalid={this.state.invalidVal} />
                        {
                            this.state.invalidVal &&
                            <FormFeedback>Ingrese un numero válido</FormFeedback>
                        }
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}


export default NuevoItem;