import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { Button } from "reactstrap";
import VincularOperacion from "./VincularOperacion";
import { CircularProgress } from '@material-ui/core';

export default class ChartOperacion extends Component {
    constructor() {
        super();
        this.state = {
            showConfig: false
        }
    }

    onClickConfig = () => {
        this.setState({
            showConfig: !this.state.showConfig
        })
    }

    chartData = () => {
        let {operacionesVinculadas, operacionesNoVinculadas} = this.props.data;
        return {
        labels: ['Vinculados', 'No vinculados'],
        datasets: [
            {
                data: [parseInt(operacionesVinculadas), parseInt(operacionesNoVinculadas)],
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
                    this.props.data?
                    <div>
                        Operaciones
                        <Chart type="pie" data={this.chartData()} options={this.lightOptions} />
                        <Button className="botonSecundario" color="primary" onClick={this.onClickConfig}>Vincular</Button>
                        {
                            this.state.showConfig &&
                            <VincularOperacion onHide={this.onClickConfig} visible={this.state.showConfig} />
                        }
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