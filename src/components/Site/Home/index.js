import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Button as PrButton } from 'primereact/button';

const Home = () => {
    return (
        <div className="box">
            <div className="boxHome principal">
                <Row>
                    <Col md="6">
                        <h1>{"<Nombre de Entidad Juridica>"}</h1>
                        <br/>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}><h5>CUIT</h5></Label>
                                <Col sm={10}>
                                <Input plaintext id="ejCuit" value="20 - 24214242 - 0" />
                                </Col>
                            </FormGroup>
                            <br/>
                            <FormGroup row>
                                <Label sm={2}><h5>Direccion</h5></Label>
                                <Col sm={10}>
                                <Input type="text" id="ejDireccion" placeholder="password placeholder" />
                                </Col>
                            </FormGroup>
                            <br/>
                            <FormGroup row>
                                <Label sm={2}><h5>Información</h5></Label>
                                <Col sm={10}>
                                <Input type="text" id="ejInfo" placeholder="password placeholder" />
                                </Col>
                            </FormGroup>
                            <br/>
                            <Button color="primary" style={{margin: "0 auto"}}>Guardar</Button>
                        </Form>
                    </Col>
                    <Col md="4">
                        
                    </Col>
                    <Col md="2">
                        <PrButton type="button" label="Configurar" icon="pi pi-sliders-v" className="p-button-info userButton" />
                    </Col>
                </Row>
            </div>
            <Row className="validaciones">
                <Col md="6">
                    <div className="boxHome secundario egresos">
                        Entidad Juridica
                    </div>
                </Col>
                <Col md="6">
                    <div className="boxHome secundario operaciones">
                        Entidad Juridica
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home;