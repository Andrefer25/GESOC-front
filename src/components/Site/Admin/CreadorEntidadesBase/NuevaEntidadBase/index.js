import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Dialog } from 'primereact/dialog';
import { Select } from 'antd';
const { Option } = Select;


const NuevaEntidadBase = ({visible, onHide}) => {

    const onChange = (value) => {
        console.log(`selected ${value}`);
    }

    const renderFooter = (
        <div>
            <Button color="primary">Crear</Button>
        </div>
    );

    return (
        <Dialog header="Crear criterio"  visible={visible} style={{ width: '30vw' }} footer={renderFooter} onHide={() => onHide()}>
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
                        placeholder="Ingrese el criterio padre"
                        optionFilterProp="children"
                        onChange={onChange}
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
            </Form>
        </Dialog>
    )
}

export default NuevaEntidadBase;