import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { Button } from "reactstrap";
import ValidarEgreso from "./ValidarEgreso";
import ValidadorTransparenciaService from '../../../../services/ValidadorTransparenciaService';
import { CircularProgress } from '@material-ui/core';

export default class ChartEgreso extends Component {
    constructor() {
        super();
        this.service = new ValidadorTransparenciaService();
        this.state = {
            validados: null,
            noValidados: null,
            showConfig: false,
            loading: true
        }
    }

    onClickConfig = () => {
        this.setState({
            showConfig: !this.state.showConfig
        })
    }

    getValidacion = async() => {
        let { egresosNoValidadosTotales, egresosValidados } = await this.service.getEstadoValidacion();

        this.setState({
            validados: egresosValidados,
            noValidados: egresosNoValidadosTotales,
            loading: false
        })
    }

    componentDidMount = async() => {
        await this.getValidacion();
    }

    chartData = () => {
        let {validados, noValidados} = this.state;
        return {
        labels: ['Validados', 'No validados'],
        datasets: [
            {
                data: [parseInt(validados), parseInt(noValidados)],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784"
                ]
            }
        ]
    }};
    
    lightOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        }
    };

    render() {
        return (
            <div className="boxHome secundario egresos">
                {
                    this.state.loading?
                    <div className="loadingAnimation">
                        <CircularProgress size="6em" />
                    </div>
                    :
                    <div>
                        Egresos
                        
                        <Chart type="pie" data={this.chartData()} options={this.lightOptions} />
                        <Button className="botonSecundario" color="primary" onClick={this.onClickConfig}>Validar</Button>
                        {
                            this.state.showConfig &&
                            <ValidarEgreso onHide={this.onClickConfig} visible={this.state.showConfig} />
                        }
                    </div>
                }
            </div>
        )
    }

}