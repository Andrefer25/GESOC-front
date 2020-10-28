import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import EntidadJuridicaService from './../../../../../services/EntidadJuridicaService';
import { validateInputText, validateInputNumber } from './../../../../../helpers/validator';

class ConfigurarEntidad extends Component {

    constructor() {
        super();
        this.service = new EntidadJuridicaService();
        this.state = {
            invalidCantPres: false,
            invalidMenorVal: false,
            data: null
        }
    }

    renderFooter = (
        <div>
            <Button color="primary" onClick={() => this.onSubmit()}>Guardar</Button>
        </div>
    );

    onSubmit = async () => {
        let CriterioCantidadPresupuestos = document.getElementById("crCant").value || "";
        let CriterioMenorValor = document.getElementById("crMenorValor").value || "";
        let CriterioCompraDeUnPresupuesto = document.getElementById("crCompra").value;
        this.setState({ invalidCantPres: false, invalidMenorVal: false });
        if(validateInputNumber(CriterioCantidadPresupuestos) && validateInputText(CriterioMenorValor)) {
            await this.saveConfig({
                configEntidadJuridica: {
                    CriterioCantidadPresupuestos,
                    CriterioMenorValor,
                    CriterioCompraDeUnPresupuesto,
                },
                idConfig: this.state.data.idConfig,
                entidadjuridica: { idEntidadJuridica: 1 }
            })
        } else {
            if(!validateInputNumber(CriterioCantidadPresupuestos)) {
                this.setState({ invalidCantPres: true });
            }
            if(!validateInputText(CriterioMenorValor)) {
                this.setState({ invalidMenorVal: true });
            }
        }
    }

    saveConfig = async(data) => {
        console.log(data);
        await this.service.updateConfiguracionEnt(data);
        this.props.onHide();
    }

    getConfig = async() => {
        let config = await this.service.getConfiguracionEnt();
        this.setState({
            data: config
        })
    }

    componentDidMount = async () => {
        await this.getConfig();
    }

    render() {
        return (
            <Dialog header="Configuracion de Entidad Juridica" visible={this.props.visible} style={{ width: '30vw' }} footer={this.renderFooter} onHide={() => this.props.onHide()}>
                {
                    this.state.data &&
                    <Form>
                        <FormGroup>
                            <Label>Criterio Cantidad Presupuestos</Label>
                            <Input type="text" id="crCant" placeholder="Ingresa la cantidad" invalid={this.state.invalidCantPres} defaultValue={this.state.data.configEntidadJuridica.CriterioCantidadPresupuestos} />
                            {
                                this.state.invalidCantPres &&
                                <FormFeedback>Ingrese una cantidad válida</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Criterio Menor Valor</Label>
                            <Input type="text" id="crMenorValor" placeholder="Ingresa el menor valor" invalid={this.state.invalidMenorVal} defaultValue={this.state.data.configEntidadJuridica.CriterioMenorValor} />
                            {
                                this.state.invalidMenorVal &&
                                <FormFeedback>Ingrese un criterio válido</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Criterio Compra De Un Presupuesto</Label>
                            <Input type="select" id="crCompra" defaultValue={this.state.data.configEntidadJuridica.CriterioCompraDeUnPresupuesto}>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </Input>
                        </FormGroup>
                    </Form>
                }
            </Dialog>
        )
    }
}

export default ConfigurarEntidad;