import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { Button } from "reactstrap";
import VincularOperacion from "./VincularOperacion";

export default class ChartOperacion extends Component {
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
        labels: ['Vinculadas', 'No vinculadas'],
        datasets: [
            {
                data: [300, 200],
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
            <div className="boxHome secundario operaciones">
                Operacion
                <Chart type="pie" data={this.chartData} options={this.lightOptions} />
                <Button className="botonSecundario" color="secondary" onClick={this.onClickConfig}>Vincular</Button>
                {
                    this.state.showConfig &&
                    <VincularOperacion onHide={this.onClickConfig} visible={this.state.showConfig} />
                }
            </div>
        )
    }

}