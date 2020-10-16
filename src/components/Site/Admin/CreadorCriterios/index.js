import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Select } from 'antd';
const { Option } = Select;


class CreadorCriterios extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    onChange = (value) => {
        console.log(`selected ${value}`);
    }
      
    onBlur = () => {
    console.log('blur');
    }
    
    onFocus = () => {
    console.log('focus');
    }
    
    onSearch = (val) => {
    console.log('search:', val);
    }

    render() {
        return (
            <div className="box">
                <div className="creadorCriterios">
                    <h1>Crear criterio</h1>
                    <br/>
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" id="crNombre" placeholder="Ingresa un nombre para el criterio" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="crPadre">Criterio Padre</Label>
                            <Select
                                id="crPadre"
                                showSearch
                                style={{width:"100%"}}
                                placeholder="Ingresa el xadre del criterio (si es que no es une bastarde)"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onSearch={this.onSearch}
                                bordered={true}
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Padre</Option>
                                <Option value="lucy">Hijo</Option>
                                <Option value="tom">Espiritu Santo</Option>
                            </Select>
                        </FormGroup>
                        <Button color="primary">Crear</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default CreadorCriterios;