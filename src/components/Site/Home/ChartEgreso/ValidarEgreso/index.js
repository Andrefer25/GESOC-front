import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Component } from 'react';
import { validateOptionalInputNumber } from '../../../../../helpers/validator';

class ValidarEgreso extends Component {

    onSubmit() {
        let cantPresupuesto = document.getElementById("cantPresupuesto").value || "";
        let compPresupuesto = document.getElementById("compPresupuesto").value;
        let menorValor = document.getElementById("menorValor").value;
        if(validateOptionalInputNumber(cantPresupuesto)) {
            
        }
    }

    render() {
        const renderFooter = (
            <div>
                <Button color="secondary" onClick={() => this.props.onHide()}>Validar</Button>
            </div>
        );
    
        return (
            <Dialog header="Validar Egreso" visible={this.props.visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => this.props.onHide()}>
                <Form>
                    <FormGroup>
                        <Label>Criterio Cantidad de Presupuestos</Label>
                        <Input defaultValue={2} type="number" id="cantPresupuesto" placeholder="Ingresa un valor" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Criterio Compra de Presupuesto</Label>
                        <Input type="select" id="compPresupuesto" placeholder="Ingresa un valor" defaultValue={"si"}>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Criterio Menor Valor</Label>
                        <Input type="select" id="menorValor" placeholder="Ingresa un valor" defaultValue={"si"}>
                            <option value="CRITERIO_MENOR_PRECIO">Criterio menor precio</option>
                            <option value="CRITERIO_MAYOR_PRECIO">Criterio mayor precio</option>
                        </Input>
                    </FormGroup>
                </Form>
            </Dialog>
        )
    }
}

export default ValidarEgreso;