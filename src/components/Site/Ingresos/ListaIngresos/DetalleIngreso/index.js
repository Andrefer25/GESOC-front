import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

const DetalleIngreso = ({ data, onHide, visible }) => {
    const renderFooter = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus />
        </div>
    );

    return (
        <Dialog header={`Detalle del Ingreso ${data.idEgreso}`} visible={visible} style={{ width: '50vw' }} footer={renderFooter} onHide={() => onHide()}>
            <Form>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="idIngreso">ID Ingreso</Label>
                        <Input type="text" disabled={true} id="idEgreso" value={data.idEgreso} />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="numeroInstrumentoPago">Numero Instrumento Pago</Label>
                        <Input type="text" id="numeroInstrumentoPago" placeholder="Numero de instrumento de pago" value={data.numeroInstrumentoPago} />
                    </FormGroup>
                    </Col>
                </Row>
            </Form>
            <h3>Id: {data.idEgreso}</h3>
            <h3>Numero Instrumento: {data.numeroInstrumentoPago}</h3>
            <h3>Importe: {data.importe}</h3>
            <h3>Fecha: {data.fechaEgreso}</h3>
        </Dialog>
    )
}

export default DetalleIngreso;
