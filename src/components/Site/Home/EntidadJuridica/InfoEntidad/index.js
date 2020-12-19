import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import { Button as PrButton } from 'primereact/button';

const InfoEntidad = ({entidadJuridica, onClickConfig, onClickEditar}) => {

    const categoria = (entidadJuridica.categoriaentidad && entidadJuridica.categoriaentidad.descripcion)? entidadJuridica.categoriaentidad.descripcion : "CARGA LOS DATOS EN EL BACK PLIS";

    return (
        <Row>
            <Col md="7">
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
            <Col md="2">
                <PrButton type="button" icon="pi pi-cog" className="colorButton p-button-rounded p-button-info userButton" onClick={() => onClickConfig()} />
                <PrButton type="button" icon="pi pi-pencil" className="colorButton p-button-rounded p-button-info userButton" onClick={() => onClickEditar()} />
            </Col>
            <Col md="3" className="colButtons">
                <div className="categoriaEntidad">
                    <p>Categoria</p>
                    <strong>{categoria.toUpperCase()}</strong>
                </div>
            </Col>
        </Row>
    )
}

export default InfoEntidad;