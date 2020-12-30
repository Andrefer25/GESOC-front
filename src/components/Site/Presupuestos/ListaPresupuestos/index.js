import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import * as Columna from './Columnas';
import DetallePresupuesto from './DetallePresupuesto';
import NuevoPresupuesto from './NuevoPresupuesto';
import PresupuestoService from './../../../../services/PresupuestoService';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';

import './../../../../assets/css/gridList.css';
import { Button } from "reactstrap";

class ListaPresupuestos extends Component {
    constructor() {
        super();

        this.service = new PresupuestoService();
        this.state = {
            data: null,
            loading: true,
            selectedDate: null,
            selectedStatus: null,
            showDialog: false,
            selectedData: null,
            showNewPresupuesto: false,
        }

        this.statuses = [
            'VALIDADO', 'NO VALIDADO'
        ]
    }

    showSuccess = () => {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError = () => {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    getLista = async() => {
        this.setState({ loading: true });
        let listaPresupuestos = await this.service.getListaPresupuestos();
        this.setState({
            data: listaPresupuestos
        })
        this.setState({ loading: false });
    }

    componentDidMount = async () => {
        await this.getLista();
        this.setState({ loading: false });
    }

    crearPresupuesto = async(data) => {
        this.service.createPresupuesto(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }  
            this.hideNuevoPresupuesto();
            await this.getLista();
        })
    }

    editarIngreso = async(data) => {
        this.service.updatePresupuesto(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.handleDialog();
            await this.getLista();
        })
    }

    subirDocumento = async(doc, id) => {
        this.service.uploadDocument(doc, parseInt(id)).then(async response => {
            if(response) {
                this.showSuccess();
            } else {
                this.showError();
            }  
            this.handleDialog();
            await this.getLista();
        })
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    hideNuevoPresupuesto = () => {
        this.setState({ showNewPresupuesto: false });
    }

    showNuevoPresupuesto = () => {
        this.setState({ showNewPresupuesto: true });
    }

    onDateChange = (e) => {
        this.dt.filter(e.value, 'fechaPresupuesto', 'custom');
        this.setState({ selectedDate: e.value });
    }

    onStatusChange = (e) => {
        this.dt.filter(e.value, 'validado', 'equals');
        this.setState({ selectedStatus: e.value })
    }

    onRowSelect = event => {
        this.setState({ showDialog: true, selectedData: event.data });
    }
    
    render() {
        const header = (
            <div className="table-header">
                <h1>
                    {this.props.nameList}
                </h1>
                <span className="p-input-icon-left">
                    <Button className="colorButton" onClick={this.showNuevoPresupuesto}><MdAddCircle className="buttonIcon" /> Nuevo Presupuesto</Button>
                </span>
            </div>
        );
        
        //const dateFilter = <Input type="datetime" name="datetime" id="exampleDatetime" dateFormat="dd-mm-yy" onChange={this.onDateChange} className="p-column-filter" placeholder="Filtrar por fecha" />
        const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={this.onStatusChange} itemTemplate={Columna.statusItemTemplate} placeholder="Seleccionar estado" className="p-column-filter" showClear />;

        return (
            <div>
                <div className="datatable-filter-demo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.data} paginator rows={10}
                            header={header} className="p-datatable-customers" selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                            emptyMessage={`No se encontraron ${this.props.nameList}.`} loading={this.state.loading}>
                            <Column field="descripcion" header="Descripción" body={Columna.descripcionTemplate} filter filterPlaceholder="Filtrar por detalle" filterMatchMode="contains" sortable />
                            <Column field="moneda" header="Moneda" body={Columna.monedaTemplate} sortable />
                            <Column field="importe" header="Importe" body={Columna.importeTemplate} filter filterPlaceholder="Filtrar por importe" filterMatchMode="contains" sortable />
                            <Column field="egresoAsignado" header="Egreso Asignado" body={this.idEgresoTemplate} filter filterPlaceholder="Filtrar por número" filterMatchMode="contains" sortable />
                        </DataTable>
                        <Toast ref={(el) => this.toast = el} />
                    </div>
                </div>
                { this.state.selectedData &&
                    <DetallePresupuesto data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} onSubmit={this.editarIngreso} subirDocumento={this.subirDocumento} />
                }
                {   
                    this.state.showNewPresupuesto &&
                    <NuevoPresupuesto visible={this.state.showNewPresupuesto} onHide={this.hideNuevoPresupuesto} crearPresupuesto={this.crearPresupuesto} />
                }
            </div>
        )
    }
}

export default ListaPresupuestos;
