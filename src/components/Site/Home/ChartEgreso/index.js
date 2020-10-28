import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { Button } from "reactstrap";
import ValidarEgreso from "./ValidarEgreso";

export default class ChartEgreso extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            showConfig: false
        }
    }

    onClickConfig = () => {
        this.setState({
            showConfig: !this.state.showConfig
        })
    }

    chartData = {
        labels: ['Validados', 'No validados'],
        datasets: [
            {
                data: [300, 200],
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
    };
    
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
                Egresos
                <Chart type="pie" data={this.chartData} options={this.lightOptions} />
                <Button className="botonSecundario" color="secondary" onClick={this.onClickConfig}>Validar</Button>
                {
                    this.state.showConfig &&
                    <ValidarEgreso onHide={this.onClickConfig} visible={this.state.showConfig} />
                }
            </div>
        )
    }

}