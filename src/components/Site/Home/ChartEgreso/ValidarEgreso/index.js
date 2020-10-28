import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ValidarEgreso = ({onHide, visible}) => {

    const renderFooter = (
        <div>
            <Button color="secondary" onClick={() => onHide()}>Validar</Button>
        </div>
    );

    return (
        <Dialog header="Validar Egreso" visible={visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => onHide()}>
            <Form>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input type="text" id="crNombre" placeholder="Ingresa un nombre para el criterio" />
                </FormGroup>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input type="text" id="crNombre" placeholder="Ingresa un nombre para el criterio" />
                </FormGroup>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input type="text" id="crNombre" placeholder="Ingresa un nombre para el criterio" />
                </FormGroup>
            </Form>
        </Dialog>
    )
}

export default ValidarEgreso;