import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { Button } from "reactstrap";
import VincularOperacion from "./VincularOperacion";
import VinculadorService from '../../../../services/VinculadorService';
import { CircularProgress } from '@material-ui/core';

export default class ChartOperacion extends Component {
    constructor() {
        super();
        this.service = new VinculadorService();
        this.state = {
            vinculados: null,
            noVinculados: null,
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
        let { operacionesNoVinculadas, operacionesVinculadas } = await this.service.getEstadoVinculacion();

        this.setState({
            vinculados: operacionesVinculadas,
            noVinculados: operacionesNoVinculadas,
            loading: false
        })
    }

    componentDidMount = async() => {
        await this.getValidacion();
    }

    chartData = () => {
        let {vinculados, noVinculados} = this.state;
        return {
        labels: ['Vinculados', 'No vinculados'],
        datasets: [
            {
                data: [parseInt(vinculados), parseInt(noVinculados)],
                backgroundColor: [
                    "brown",
                    "#b39f2d"
                ],
                hoverBackgroundColor: [
                    "#ad5353",
                    "burlywood"
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
            <div className="boxHome secundario operaciones">
                {
                    this.state.loading?
                    <div className="loadingAnimation">
                        <CircularProgress size="6em" />
                    </div>
                    :
                    <div>
                        Operaciones
                        <Chart type="pie" data={this.chartData()} options={this.lightOptions} />
                        <Button className="botonSecundario" color="primary" onClick={this.onClickConfig}>Vincular</Button>
                        {
                            this.state.showConfig &&
                            <VincularOperacion onHide={this.onClickConfig} visible={this.state.showConfig} />
                        }
                    </div>
                }
            </div>
        )
    }

}