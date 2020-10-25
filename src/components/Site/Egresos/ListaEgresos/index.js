import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import * as Columna from './Columnas';
import DetalleEgreso from './DetalleEgreso';
import NuevoEgreso from './NuevoEgreso';
import EgresoService from './../../../../services/EgresoService';
import { Calendar } from 'primereact/calendar';
import { MdAddCircle } from 'react-icons/md';

import './../../../../assets/css/gridList.css';
import { Button } from "reactstrap";

class ListaEgresos extends Component {
    constructor() {
        super();

        this.service = new EgresoService();
        this.state = {
            data: null,
            loading: true,
            selectedDate: null,
            selectedStatus: null,
            showDialog: false,
            selectedData: null,
            showNewEgreso: false
        }

        this.statuses = [
            'VALIDADO', 'NO VALIDADO'
        ]
    }

    componentDidMount() {

        this.setState({
            data: this.service.getEgresos(),
            loading: false
        })
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    hideNuevoEgreso = () => {
        this.setState({ showNewEgreso: false });
    }

    showNuevoEgreso = () => {
        this.setState({ showNewEgreso: true });
    }

    onDateChange = (e) => {
        this.dt.filter(e.value, 'fechaEgreso', 'custom');
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
                <Button className="colorButton" onClick={this.showNuevoEgreso}>NuevoEgreso</Button>
            </div>
        );
        
        const dateFilter = <Calendar value={this.state.selectedDate} onChange={this.onDateChange} dateFormat="dd-mm-yy" className="p-column-filter" placeholder="Filtrar por fecha" />;
        const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={this.onStatusChange} itemTemplate={Columna.statusItemTemplate} placeholder="Seleccionar estado" className="p-column-filter" showClear />;

        return (
            <div>
                <div className="datatable-filter-demo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.data} paginator rows={10}
                            header={header} className="p-datatable-customers" selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                            emptyMessage={`No se encontraron ${this.props.nameList}.`} loading={this.state.loading}>
                            <Column field="idEgreso" header="ID" body={Columna.idEgresoTemplate} filter filterPlaceholder="Filtrar por ID" filterMatchMode="contains" />
                            <Column field="numeroInstrumentoPago" header="Numero Instrumento" body={this.numeroInstrumentoTemplate} filter filterPlaceholder="Filtrar por numero" filterMatchMode="contains" />
                            <Column field="importe" header="Importe" body={Columna.importeTemplate} filter filterPlaceholder="Filtrar por importe" />
                            <Column field="fechaEgreso" header="Fecha" body={Columna.dateBodyTemplate} filter filterElement={dateFilter} filterFunction={Columna.filterDate} />
                            <Column field="validado" header="Estado" body={Columna.statusBodyTemplate} filter filterElement={statusFilter} />
                        </DataTable>
                    </div>
                </div>
                { this.state.selectedData &&
                    <DetalleEgreso data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} />
                }
                {   
                    this.state.showNewEgreso &&
                    <NuevoEgreso visible={this.state.showNewEgreso} onHide={this.hideNuevoEgreso}/>
                }  
            </div>
        )
    }
}

export default ListaEgresos;