import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import { Button } from 'reactstrap';
import PrimerPaso from './PrimerPaso';
import SegundoPaso from './SegundoPaso';
import MediosDePagoService from './../../../../../services/MediosDePagoService';
import PresupuestoService from '../../../../../services/PresupuestoService';

export default class NuevoEgreso extends Component {

    constructor() {
        super();
        this.dataMP = new MediosDePagoService();
        this.presupuestoService = new PresupuestoService();
        this.state = {
            activeIndex: 0,
            isValid: [],
            listaPresupuestos: [],
            monedas: null,
            mediosPago: null,
            presupuestos: null
        }
    }

    getMonedasYMedioPago = async() => {
        let monedas = await this.dataMP.getMonedas();
        let mediosPago = await this.dataMP.getMediosPago();

        this.setState({
            monedas, mediosPago
        });
    }

    getPresupuestos = async() => {
        let presupuestos = await this.presupuestoService.getListaPresupuestos();

        this.setState({ presupuestos });
    }

    componentDidMount = async() => {
        this.getMonedasYMedioPago().then(async() => {
            await this.getPresupuestos();
        });
    }

    renderFooter = () => (
        <div>
            { this.state.activeIndex > 0 &&
                <Button color="primary" onClick={() => this.lastItem()}>Anterior</Button>
            }
            { (this.state.activeIndex < this.items.length-1) &&
                <Button color="primary" onClick={() => this.nextItem()} disabled={!this.state.isValid[this.state.activeIndex.toString()]}>Siguiente</Button>
            }
        </div>
    );

    lastItem = () => {
        this.setState({ activeIndex: this.state.activeIndex-1 })
    }

    nextItem = () => {
        this.setState({ activeIndex: this.state.activeIndex+1 })
    }

    insertData = (data) => {
        let egreso = data;
        egreso.presupuestos = this.state.listaPresupuestos;
        this.props.crearEgreso(data);
    }

    updatePresupuestos = (index, presupuestos) => {
        let valid = this.state.isValid;
        valid[index] = (presupuestos.length > 0);

        this.setState({ listaPresupuestos: presupuestos, isValid: valid });
    }

    getPresupuestosElegidos = (presupuestos) => {
        let lista = presupuestos.filter(e => this.state.listaPresupuestos.indexOf(e.idPresupuesto) !== -1);
        return lista;
    }

    renderStepComponent = () => {
        let index = this.state.activeIndex;
        let { monedas, mediosPago } = this.state;
        switch(index) {
            case 0:
                return <PrimerPaso index="0" updatePresupuestos={this.updatePresupuestos} lista={this.state.listaPresupuestos} presupuestos={this.state.presupuestos} />
            case 1:
                return <SegundoPaso index="1" lista={this.getPresupuestosElegidos(this.state.presupuestos)} insertData={this.insertData} monedas={monedas} mediosPago={mediosPago}/>
            default:
                return <PrimerPaso />
        }
    }

    items = [{ label: 'Cargar presupuestos' }, { label: 'Información egreso' }];

    render() {
        return (
            <Dialog header="Nuevo egreso" visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={true} />
                <br/>
                { (this.state.monedas && this.state.presupuestos) &&
                this.renderStepComponent()}
            </Dialog>
        )
    }

}