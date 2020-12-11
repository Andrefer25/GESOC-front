import React, { Component } from 'react';
import ConfigurarEntidad from './ConfigurarEntidad';
import EditarEntidad from './EditarEntidad';
import InfoEntidad from './InfoEntidad';
import { CircularProgress } from '@material-ui/core';
import EntidadJuridicaService from './../../../../services/EntidadJuridicaService';

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
        return await this.props.edit(data);
    }

    render() {

        return (
            <div className="boxHome principal">
                {
                    this.props.data?
                    <InfoEntidad entidadJuridica={this.props.data} onClickConfig={this.onClickConfig} onClickEditar={this.onClickEditar} />
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
                    <EditarEntidad onHide={this.onClickEditar} visible={this.state.showEditar} entidadJuridica={this.props.data} onSubmit={this.editarEntidad} />
                }
            </div>
        )
    }
}

export default EntidadJuridica;