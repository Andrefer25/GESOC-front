import React, { Component } from 'react';
import ConfigurarEntidad from './ConfigurarEntidad';
import EditarEntidad from './EditarEntidad';
import InfoEntidad from './InfoEntidad';
import { CircularProgress } from '@material-ui/core';
import EntidadJuridicaService from './../../../../services/EntidadJuridicaService';
import { Toast } from 'primereact/toast';

class EntidadJuridica extends Component {

    constructor() {
        super();
        this.service = new EntidadJuridicaService();
        this.state = {
            showConfig: false,
            showEditar: false,
            dataEntidadJuridica: null
        }
    }

    showSuccess = () => {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError = () => {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    getEntidadJuridicaInfo = async () => {
        let data = await this.service.getEntidadJuridica();
        this.setState({dataEntidadJuridica: data});
    } 

    componentDidMount = async () => {
        await this.getEntidadJuridicaInfo();
    }

    onClickConfig = () => {
        this.setState({
            showConfig: !this.state.showConfig,
        })
    }

    onClickEditar = () => {
        this.setState({
            showEditar: !this.state.showEditar,
        })
    }

    editarEntidad = async (data) => {
        let resultado = await this.service.editarEntidadJuridica(data);
        if(resultado) {
            this.showSuccess();
        } else {
            this.showError();
        }
        await this.getEntidadJuridicaInfo();
    }

    render() {

        return (
            <div className="boxHome principal">
                <Toast ref={(el) => this.toast = el} />
                {
                    this.state.dataEntidadJuridica?
                    <InfoEntidad entidadJuridica={this.state.dataEntidadJuridica} onClickConfig={this.onClickConfig} onClickEditar={this.onClickEditar} />
                    :
                    <div className="loadingAnimation">
                        <CircularProgress size="6em" />
                    </div>

                }
                {
                    this.state.showConfig &&
                    <ConfigurarEntidad onHide={this.onClickConfig} visible={this.state.showConfig} />
                }
                {
                    this.state.showEditar &&
                    <EditarEntidad onHide={this.onClickEditar} visible={this.state.showEditar} entidadJuridica={this.state.dataEntidadJuridica} onSubmit={this.editarEntidad} />
                }
            </div>
        )
    }
}

export default EntidadJuridica;