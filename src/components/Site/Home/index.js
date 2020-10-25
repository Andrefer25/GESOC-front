import React from 'react';
import { Row, Col } from 'reactstrap';
import EntidadJuridica from './EntidadJuridica';
import ChartEgreso from './ChartEgreso';
import ChartOperacion from './ChartOperacion';

const Home = () => {
    return (
        <div className="box">
            <EntidadJuridica />
            <Row className="validaciones">
                <Col md="6">
                    <ChartEgreso />
                </Col>
                <Col md="6">
                    <ChartOperacion />
                </Col>
            </Row>
        </div>
    )
}

export default Home;