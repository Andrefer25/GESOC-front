import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Button as PrButton } from 'primereact/button';

const Home = () => {
    return (
        <div className="box">
            <div className="boxHome principal principalHome">
                <Row>
                    <Col md="6">
                        <h3>{"<Nombre de Entidad Juridica>"}</h3>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}><h5>CUIT</h5></Label>
                                <Col sm={10}>
                                <Input plaintext id="ejCuit" value="20-24214242-0" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}><h5>Direccion</h5></Label>
                                <Col sm={7}>
                                <Input type="text" id="ejDireccion" placeholder="password placeholder" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}><h5>Información</h5></Label>
                                <Col sm={7}>
                                <Input type="text" id="ejInfo" placeholder="password placeholder" />
                                </Col>
                            </FormGroup>
                            <Button color="primary" className="colorBadge" style={{margin: "0 auto"}}>Guardar</Button>
                        </Form>
                    </Col>
                    <Col md="5">
                        
                    </Col>
                    <Col md="1">
                        <PrButton type="button" icon="pi pi-cog" className="colorButton p-button-rounded p-button-info userButton" />
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