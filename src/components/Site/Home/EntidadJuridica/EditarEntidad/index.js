import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EditarEntidad = ({onHide, visible}) => {

    const renderFooter = (
        <div>
            <Button color="primary" onClick={() => onHide()}>Guardar</Button>
        </div>
    );

    return (
        <Dialog header="Editar Entidad Juridica" visible={visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => onHide()}>
            <Form>
                <FormGroup>
                    <Label>Actividad</Label>
                    <Input type="select" name="select" id="entActividad">
                        <option>Construcción</option>
                        <option>Servicios</option>
                        <option>Comercio</option>
                        <option>Industria y Minería</option>
                        <option>Agropecuario</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Cantidad de empleados</Label>
                    <Input type="text" id="crNombre" placeholder="Ingresa la cantidad" />
                </FormGroup>
                <FormGroup>
                    <Label>Promedio de ventas</Label>
                    <Input type="text" id="crNombre" placeholder="Ingresa el promedio" />
                </FormGroup>
            </Form>
        </Dialog>
    )
}

export default EditarEntidad;