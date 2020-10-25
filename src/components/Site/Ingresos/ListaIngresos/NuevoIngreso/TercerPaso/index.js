import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

const PrimerPaso = (props) => {
    
    const onchange = () => {
        let prop9 = document.getElementById("prop9").value || "";
        let prop10 = document.getElementById("prop10").value || "";
        let prop11 = document.getElementById("prop11").value || "";
        let prop12 = document.getElementById("prop12").value || "";
        let data = { prop9, prop10, prop11, prop12 };
        let isValid = prop9!==""&&prop10!==""&&prop11!==""&&prop12!=="";

        props.onChange(props.index, data, isValid);
    }

    return (
        <Form>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label>Prop9</Label>
                        <Input type="text" id="prop9" placeholder="Ingresa Prop9" onChange={onchange} value={props.data? props.data.prop9:""} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prop11</Label>
                        <Input type="text" id="prop11" placeholder="Ingresa Prop11" onChange={onchange} value={props.data? props.data.prop11:""} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Prop10</Label>
                        <Input type="text" id="prop10" placeholder="Ingresa Prop10" onChange={onchange} value={props.data? props.data.prop10:""} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prop12</Label>
                        <Input type="text" id="prop12" placeholder="Ingresa Prop12" onChange={onchange} value={props.data? props.data.prop12:""} />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
}

export default PrimerPaso;