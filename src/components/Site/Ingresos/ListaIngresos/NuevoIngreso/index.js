import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import { Button } from 'reactstrap';
import PrimerPaso from './PrimerPaso';
import SegundoPaso from './SegundoPaso';
import TercerPaso from './TercerPaso';

export default class NuevoIngreso extends Component {

    constructor() {
        super();
        this.state = {
            activeIndex: 0,
            nuevoEgreso: [],
            isValid: []
        }
    }

    renderFooter = () => (
        <div>
            { this.state.activeIndex > 0 &&
                <Button color="primary" onClick={() => this.lastItem()}>Anterior</Button>
            }
            { this.state.activeIndex < this.items.length-1 &&
                <Button color="primary" onClick={() => this.nextItem()} disabled={!this.state.isValid[this.state.activeIndex.toString()]}>Siguiente</Button>
            }
            <Button color="danger" onClick={() => this.props.onHide()}>Cancelar</Button>
        </div>
    );

    lastItem = () => {
        this.setState({ activeIndex: this.state.activeIndex-1 })
    }

    nextItem = () => {
        this.setState({ activeIndex: this.state.activeIndex+1 })
    }

    insertData = (index, data, isValid) => {
        let dataEgreso = this.state.nuevoEgreso;
        let valid = this.state.isValid;
        valid[index] = isValid;
        dataEgreso[index] = data;
        console.log(data);
        this.setState({ nuevoEgreso: dataEgreso, isValid: valid });
    }

    renderStepComponent = () => {
        let index = this.state.activeIndex;
        switch(index) {
            case 0:
                return <PrimerPaso index="0" data={this.state.nuevoEgreso[0]} onChange={this.insertData}/>
            case 1:
                return <SegundoPaso index="1" data={this.state.nuevoEgreso[1]} onChange={this.insertData}/>
            case 2:
                return <TercerPaso index="2" data={this.state.nuevoEgreso[2]} onChange={this.insertData}/>
            default:
                return <PrimerPaso />
        }
    }

    items = [{ label: 'Paso 1' }, { label: 'Paso 2' }, { label: 'Paso 3' }];

    render() {
        return (
            <Dialog header="Nuevo egreso" visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={true} />
                <br/>
                {this.renderStepComponent()}
            </Dialog>
        )
    }

}