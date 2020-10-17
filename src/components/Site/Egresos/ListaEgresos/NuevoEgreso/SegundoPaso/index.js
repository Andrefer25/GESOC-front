import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

const PrimerPaso = (props) => {
    
    const onchange = () => {
        let prop5 = document.getElementById("prop5").value || "";
        let prop6 = document.getElementById("prop6").value || "";
        let prop7 = document.getElementById("prop7").value || "";
        let prop8 = document.getElementById("prop8").value || "";
        let data = { prop5, prop6, prop7, prop8 };

        let isValid = prop5!==""&&prop6!==""&&prop7!==""&&prop8!=="";

        props.onChange(props.index, data, isValid);
    }

    return (
        <Form>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label>Prop5</Label>
                        <Input type="text" id="prop5" placeholder="Ingresa Prop5" onChange={onchange} value={props.data? props.data.prop5:""} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prop7</Label>
                        <Input type="text" id="prop7" placeholder="Ingresa Prop7" onChange={onchange} value={props.data? props.data.prop7:""} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Prop6</Label>
                        <Input type="text" id="prop6" placeholder="Ingresa Prop6" onChange={onchange} value={props.data? props.data.prop6:""} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prop8</Label>
                        <Input type="text" id="prop8" placeholder="Ingresa Prop8" onChange={onchange} value={props.data? props.data.prop8:""} />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
}

export default PrimerPaso;