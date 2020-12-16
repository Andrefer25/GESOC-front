import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { Button } from "reactstrap";
//import ValidarEgreso from "./ValidarEgreso";
import { CircularProgress } from '@material-ui/core';

export default class ChartEgreso extends Component {
    constructor() {
        super();
        this.state = {
            showConfig: false
        }
    }

    onClickValidar = async () => {
        await this.props.validar();
    }

    chartData = () => {
        let { egresosNoValidadosTotales, egresosValidados } = this.props.data;
        return {
        labels: ['Validados', 'No validados'],
        datasets: [
            {
                data: [parseInt(egresosValidados), parseInt(egresosNoValidadosTotales)],
                backgroundColor: [
                    "#b39f2d",
                    "brown"
                ],
                hoverBackgroundColor: [
                    "burlywood",
                    "#ad5353"
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
                    this.props.data?
                    <div>
                        Egresos
                        <Chart type="pie" data={this.chartData()} options={this.lightOptions} />
                        <Button className="botonSecundario" color="primary" onClick={this.onClickValidar}>Validar</Button>
                        {/* {
                            this.state.showConfig &&
                            <ValidarEgreso onHide={this.onClickConfig} visible={this.state.showConfig} />
                        } */}
                    </div>
                    :
                    <div className="loadingAnimation">
                        <CircularProgress size="6em" />
                    </div>
                }
            </div>
        )
    }

}