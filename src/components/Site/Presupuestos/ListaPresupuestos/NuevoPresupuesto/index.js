import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import { Button } from 'reactstrap';
import PrimerPaso from './PrimerPaso';
import SegundoPaso from './SegundoPaso';
import MediosDePagoService from './../../../../../services/MediosDePagoService';
import ItemService from './../../../../../services/ItemService';

export default class NuevoPresupuesto extends Component {

    constructor() {
        super();
        this.dataMP = new MediosDePagoService();
        this.itemService = new ItemService();
        this.state = {
            activeIndex: 0,
            isValid: [],
            listaItems: [],
            monedas: null,
            mediosPago: null,
            items: null
        }
    }

    getMonedasYMedioPago = async() => {
        let monedas = await this.dataMP.getMonedas();
        let mediosPago = await this.dataMP.getMediosPago();

        this.setState({
            monedas, mediosPago
        });
    }

    getItems = async() => {
        let items = await this.itemService.getItems();
        this.setState({
            items
        })
    }

    componentDidMount = async() => {
        this.getMonedasYMedioPago().then(async() => {
            await this.getItems();
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
            <Button color="danger" onClick={() => this.props.onHide()}>Cancelar</Button>
        </div>
    );

    lastItem = () => {
        this.setState({ activeIndex: this.state.activeIndex-1 })
    }

    nextItem = () => {
        this.setState({ activeIndex: this.state.activeIndex+1 })
    }

    insertData = (data) => {
        let presupuestoData = {
            importe: parseFloat(data.importe),
            detalles: data.detalles,
            proveedor: data.proveedor,
            moneda: data.moneda,
            items: data.items
        }
        this.props.crearPresupuesto(presupuestoData);
    }

    updateItems = (index, items) => {
        let valid = this.state.isValid;
        valid[index] = (items.length > 0);

        this.setState({ listaItems: items, isValid: valid });
    }

    renderStepComponent = () => {
        let index = this.state.activeIndex;
        let { monedas, mediosPago, items } = this.state;
        switch(index) {
            case 0:
                return <PrimerPaso index="0" updateItems={this.updateItems} lista={this.state.listaItems} data={items} />
            case 1:
                return <SegundoPaso index="1" insertData={this.insertData} items={this.state.listaItems} monedas={monedas} mediosPago={mediosPago}/>
            default:
                return <PrimerPaso />
        }
    }

    items = [{ label: 'Cargar Items' }, { label: 'Información Presupuesto' }];

    render() {
        return (
            <Dialog header="Nuevo Presupuesto" visible={this.props.visible} style={{ width: '50vw' }} footer={this.renderFooter()} onHide={() => this.props.onHide()}>
                <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={true} />
                <br/>
                { (this.state.monedas && this.state.items) &&
                this.renderStepComponent()}
            </Dialog>
        )
    }

}