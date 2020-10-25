import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import { Button as PrButton } from 'primereact/button';

const InfoEntidad = ({entidadJuridica, onClickConfig, onClickEditar}) => {

    return (
        <Row>
            <Col md="9">
                <h1>{entidadJuridica.nombreFicticio}</h1>
                <Form style={{marginTop:"1.3em"}}>
                    <FormGroup row className="entidadDataElement">
                        <Label sm={4}><h5>CUIT: </h5></Label>
                        <Col sm={8} className="entidadDataValue">
                            <h5>{entidadJuridica.cuit}</h5>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="entidadDataElement">
                        <Label sm={4}><h5>Direccion: </h5></Label>
                        <Col sm={8} className="entidadDataValue">
                            <h5>{"Av. 9 de Julio 2049"}</h5>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="entidadDataElement">
                        <Label sm={4}><h5>Actividad:</h5></Label>
                        <Col sm={8} className="entidadDataValue">
                            <h5>{entidadJuridica.actividad}</h5>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="entidadDataElement">
                        <Label sm={4}><h5>Cantidad Empleados:</h5></Label>
                        <Col sm={8} className="entidadDataValue">
                            <h5>{entidadJuridica.cantidadEmpleados}</h5>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="entidadDataElement">
                        <Label sm={4}><h5>Promedio Ventas:</h5></Label>
                        <Col sm={8} className="entidadDataValue">
                            <h5>{entidadJuridica.promedioVentas}</h5>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
            <Col md="3" className="colButtons">
                <div className="categoriaEntidad">
                    <p>Categoria</p>
                    <p>{"Mediana".toUpperCase()}</p>
                </div>
                <PrButton type="button" label="Configurar" icon="pi pi-sliders-v" className="p-button-info userButton" onClick={() => onClickConfig()} />
                <PrButton type="button" label="Editar" icon="pi pi-sliders-v" className="p-button-info userButton" onClick={() => onClickEditar()} />
            </Col>
        </Row>
    )
}

export default InfoEntidad;