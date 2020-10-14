import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import EgresoService from './../../services/EgresoService';
import { Calendar } from 'primereact/calendar';
//import { MultiSelect } from 'primereact/multiselect';

import './gridList.css'

const service = new EgresoService();

class Listado extends Component {
    constructor() {
        super();

        this.state = {
            data: null,
            loading: true,
            selectedDate: null,
            globalFilter: null,
            selectedStatus: null
        }

        this.statuses = [
            'VALIDADO', 'NO VALIDADO'
        ]
    }

    componentDidMount() {

        this.setState({
            data: service.getEgresos(),
            loading: false
        })
    }

    onDateChange = (e) => {
        this.dt.filter(e.value, 'fechaEgreso', 'custom');
        this.setState({ selectedDate: e.value });
    }

    onStatusChange = (e) => {
        this.dt.filter(e.value, 'validado', 'equals');
        this.setState({ selectedStatus: e.value })
    }

    idEgresoTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">ID</span>
                {rowData.idEgreso}
            </React.Fragment>
        );
    }

    numeroInstrumentoTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Numero Instrumento</span>
                {rowData.numeroInstrumentoPago}
            </React.Fragment>
        );
    }

    descripcionTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Descripcion</span>
                {rowData.descripcion}
            </React.Fragment>
        );
    }

    importeTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Importe</span>
                {`$ ${rowData.importe}`}
            </React.Fragment>
        );
    }

    formatDate = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return `${day}-${month}-${date.getFullYear()}`;
    }
    
    filterDate(value, filter) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        else if (value === undefined || value === null) {
            return false;
        }

        else {
            let month = filter.getMonth() + 1;
            let day = filter.getDate();

            if (month < 10) {
                month = '0' + month;
            }

            if (day < 10) {
                day = '0' + day;
            }

            return value === `${day}-${month}-${filter.getFullYear()}`
        }
    }

    statusBodyTemplate({validado}) {
        return (
            <React.Fragment>
                <span className="p-column-title">Estado</span>
                <span className={`p-tag ${validado==='VALIDADO'?'p-tag-success':'p-tag-danger'}`}>
                    {validado}
                </span>
                
            </React.Fragment>
        );
    }

    statusItemTemplate(option) {
        return <span className={`p-tag ${option==="VALIDADO"?'p-tag-success':'p-tag-danger'}`}>{option}</span>;
    }

    dateBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Fecha Egreso</span>
                <span>{rowData.fechaEgreso}</span>
            </React.Fragment>
        );
    }

    onRowSelect(event) {
        alert('ID Egreso seleccionado: ' + event.data.idEgreso);
    }

    onRowUnselect(event) {
        alert('ID Egreso deseleccionado: ' + event.data.idEgreso);
    }
    
    render() {
        const header = (
            <div className="table-header">
                {this.props.nameList}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder={`Buscar ${this.props.nameList}`} />
                </span>
            </div>
        );
        
        const dateFilter = <Calendar value={this.state.selectedDate} onChange={this.onDateChange} dateFormat="dd-mm-yy" className="p-column-filter" placeholder="Filtrar por fecha" />;
        const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={this.onStatusChange} itemTemplate={this.statusItemTemplate} placeholder="Seleccionar estado" className="p-column-filter" showClear />;

        return (
            <div>
                {/*Renderizamos en el listado los datos filtrados*/}
                <div className="datatable-filter-demo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.data} paginator rows={10}
                            header={header} className="p-datatable-customers" selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect} onRowUnselect={this.onRowUnselect}
                            globalFilter={this.state.globalFilter} emptyMessage={`No se encontraron ${this.props.nameList}.`} loading={this.state.loading}>
                            <Column field="idEgreso" header="ID" body={this.idEgresoTemplate} filter filterPlaceholder="Filtrar por ID" filterMatchMode="contains" />
                            <Column field="numeroInstrumentoPago" header="Numero Instrumento" body={this.numeroInstrumentoTemplate} filter filterPlaceholder="Filtrar por numero" filterMatchMode="contains" />
                            <Column field="importe" header="Importe" body={this.importeTemplate} filter filterPlaceholder="Filtrar por importe" />
                            <Column field="fechaEgreso" header="Fecha" body={this.dateBodyTemplate} filter filterElement={dateFilter} filterFunction={this.filterDate} />
                            <Column field="validado" header="Estado" body={this.statusBodyTemplate} filter filterElement={statusFilter} />
                        </DataTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default Listado;