import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

const PrimerPaso = (props) => {
    
    const onchange = () => {
        let prop1 = document.getElementById("prop1").value || "";
        let prop2 = document.getElementById("prop2").value || "";
        let prop3 = document.getElementById("prop3").value || "";
        let prop4 = document.getElementById("prop4").value || "";
        let data = { prop1, prop2, prop3, prop4 };
        let isValid = prop1!==""&&prop2!==""&&prop3!==""&&prop4!=="";

        props.onChange(props.index, data, isValid);
    }

    return (
        <Form>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label>Prop1</Label>
                        <Input type="text" id="prop1" placeholder="Ingresa Prop1" onChange={onchange} value={props.data? props.data.prop1:""} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prop3</Label>
                        <Input type="text" id="prop3" placeholder="Ingresa Prop3" onChange={onchange} value={props.data? props.data.prop3:""} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Prop2</Label>
                        <Input type="text" id="prop2" placeholder="Ingresa Prop2" onChange={onchange} value={props.data? props.data.prop2:""} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prop4</Label>
                        <Input type="text" id="prop4" placeholder="Ingresa Prop4" onChange={onchange} value={props.data? props.data.prop4:""} />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
}

export default PrimerPaso;