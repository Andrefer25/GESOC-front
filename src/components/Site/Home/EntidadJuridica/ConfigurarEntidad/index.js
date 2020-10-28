import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ConfigurarEntidad = ({onHide, visible}) => {

    const renderFooter = (
        <div>
            <Button color="primary" onClick={() => onHide()}>Guardar</Button>
        </div>
    );

    return (
        <Dialog header="Configuracion de Entidad Juridica" visible={visible} style={{ width: '35vw' }} footer={renderFooter} onHide={() => onHide()}>
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

export default ConfigurarEntidad;